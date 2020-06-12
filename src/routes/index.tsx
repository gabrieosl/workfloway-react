import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import SignIn from '../pages/SignIn';
// import SignUp from '../pages/SignUp';

import WorkflowMaker from '../pages/WorkflowMaker';
// import Profile from '../pages/Profile';

import { WorkflowProvider } from '../context/WorkflowContext';

const routes: React.FC = () => {
  return (
    <WorkflowProvider>
      <Switch>
        <Route path="/" exac component={WorkflowMaker} />
        {/* <Route path="/" exact component={SignIn} /> */}
        {/* <Route path="/dashboard" component={Dashboard} isPrivate /> */}
        {/* <Route path="/profile" component={Profile} isPrivate /> */}
        <Route path="/" component={() => <h1>404</h1>} />
      </Switch>
    </WorkflowProvider>
  );
};

export default routes;
