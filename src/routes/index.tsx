import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
// import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Workflows from '../pages/Workflows';
// import Profile from '../pages/Profile';

import { WorkflowProvider } from '../context/WorkflowContext';

const routes: React.FC = () => {
  return (
    <WorkflowProvider>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/workflow" component={Workflows} isPrivate />
        {/* <Route path="/profile" component={Profile} isPrivate /> */}
        <Route path="/" component={() => <h1>404</h1>} />
      </Switch>
    </WorkflowProvider>
  );
};

export default routes;
