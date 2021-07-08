import React from 'react';
import { useAuth } from 'modules/auth';
import './TestProfile.css';

const TestProfile: React.FC<{}> = () => {
  const { user } = useAuth();
  const text = user.isNil()
    ? 'Not authenticated yet'
    : `Profile of ${user.email}`;

  return (
    <div className="test-profile">{text}</div>
  );
};

export default TestProfile;