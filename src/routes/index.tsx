import React from 'react';
import {
  Switch /* , Route as ReactDOMRoute, Redirect */,
} from 'react-router-dom';

import Route from './Route';

// import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
// import Selection from '../pages/Selection';
import Workflows from '../pages/Workflows';
// import Activities from '../pages/Activities';
import Settings from '../pages/Settings';

const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/settings" component={Settings} isPrivate />
      <Route path="/workflows" component={Workflows} isPrivate />
      {/* <Route path="/selection" component={Selection} isPrivate />
      <Route path="/activities" component={Activities} isPrivate />
      <ReactDOMRoute path="/signin" exact component={SignIn} />
      <ReactDOMRoute
      path="/"
      exact
        render={() => <Redirect to={{ pathname: '/dashboard' }} />}
      />
      <ReactDOMRoute path="/" component={() => <h1>404</h1>} /> */}
    </Switch>
  );
};

export default routes;
