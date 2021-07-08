import React, { useMemo } from 'react';
import { UserManagementPermission, getManagementPermissionKeys } from 'lib/permission';
import { AuthContext, AuthUser } from 'modules/auth';
import { useHistory } from 'react-router-dom';

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

const DashboardPage: React.FC<{}> = () => {
  const history = useHistory();
  return (
    <AuthContext.Consumer>
      {({ user, logout }) => {
        const handleLogout = () => {
          logout()
            .then(() => {
              history.push('/login');
            });
        };

        return (
          <div style={{ width: 600, margin: '0 auto' }}>
            <div>Hi {user.name}. <button onClick={handleLogout}>Logout</button></div>
            <div>
              Able to create user? {user.hasPermission(UserManagementPermission.Create) ? 'Yes' : 'No'}
            </div>
            <PermissionsViewer user={user} />
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default DashboardPage;