import React from 'react';
import TestProfile from 'components/TestProfile';
import { AuthProvider, PrivateRoute } from 'modules/auth';
import { LoginPage } from 'modules/auth/pages';
import { DashboardPage } from 'modules/dashboard/pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

function Routes () {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/dashboard">
            <DashboardPage />
          </PrivateRoute>
        </Switch>
      </Router>
      <div className="test-profile-wrapper">
        <TestProfile />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
