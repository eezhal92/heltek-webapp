import React, { useMemo } from 'react';
import TestProfile from 'components/TestProfile';
import { UserManagementPermission, getManagementPermissionKeys } from 'lib/permission';
import { AuthContext, AuthProvider, AuthUser } from 'modules/auth';
import { LoginPage } from 'modules/auth/pages';
import './App.css';

function PermissionsViewer (props: { user: AuthUser }) {
  const availablePermissions = useMemo(() => {
    return getManagementPermissionKeys();
  }, []);
  return <div>{availablePermissions.map(key => {
    const hasPermission = props.user.hasPermission(key);
    return (
      <div key={key} style={{ color: hasPermission ? 'forestgreen' : 'red' }}>
        <span>{key}: {hasPermission ? 'Authorized' : 'Not authorized'}</span>
      </div>
    );
  })}</div>
}

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <AuthContext.Consumer>
          {({ user, logout }) => {
            if (user.isNil()) {
              return <LoginPage />;
            }

            return (
              <div style={{ width: 600, margin: '0 auto' }}>
                <div>Hi {user.name}. <button onClick={logout}>Logout</button></div>
                <div>
                  Able to create user? {user.hasPermission(UserManagementPermission.Create) ? 'Yes' : 'No'}
                </div>
                <PermissionsViewer user={user} />
              </div>
            );
          }}
        </AuthContext.Consumer>
        <div className="test-profile-wrapper">
          <TestProfile />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
