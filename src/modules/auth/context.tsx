import React, { useCallback, createContext, useState, useEffect } from 'react';
import TokenStorage from 'lib/token-storage';
import * as api from './api';

import { AuthUser, NilUser, User } from './model';

interface AuthContextValue {
  user: AuthUser;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextValue>({
  user: new NilUser(),
  login: () => Promise.resolve(null),
  logout: () => Promise.resolve(null),
});

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [isFetchingMe, setIsFetchingMe] = useState<boolean>(true);
  const [token] = useState<string | null>(TokenStorage.getToken());
  const [user, setUser] = useState<AuthUser>(new NilUser());

  const login = useCallback((email: string, password: string) => {
    return api.login(email, password)
      .then(res => {
        const { email, name, roles }  = res.user;
        setUser(new User(name, email, roles));
        TokenStorage.store(res.token);
        return res;
      });
  }, []);

  const logout = useCallback(() => {
    return api.logout()
      .then(res => {
        setUser(new NilUser());
        TokenStorage.revoke();
        return res;
      });
  }, []);

  useEffect(() => {
    if (!token) {
      setIsFetchingMe(false);
      return;
    };
    console.log('Fetching user info with token', token);
    setIsFetchingMe(true);
    api.getMe().then((res) => {
      const { email, name, roles }  = res.user;
      setUser(new User(name, email, roles));
    })
    .finally(() => {
      setIsFetchingMe(false);
    });
  }, [token, setIsFetchingMe]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {(() => {
        if (isFetchingMe) return null;

        return children;
      })()}
    </AuthContext.Provider>
  );
}
