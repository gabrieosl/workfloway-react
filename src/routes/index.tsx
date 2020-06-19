import React from 'react';
import { Switch, Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import Selections from '../pages/Selections';
import Workflows from '../pages/Workflows';
import Activities from '../pages/Activities';

import { WorkflowProvider } from '../context/WorkflowContext';

const routes: React.FC = () => {
  return (
    <WorkflowProvider>
      <Switch>
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/selections" component={Selections} isPrivate />
        <Route path="/workflows" component={Workflows} isPrivate />
        <Route path="/activities" component={Activities} isPrivate />
        <ReactDOMRoute path="/signin" exact component={SignIn} />
        <ReactDOMRoute
          path="/"
          exact
          render={() => <Redirect to={{ pathname: '/dashboard' }} />}
        />
        <ReactDOMRoute path="/" component={() => <h1>404</h1>} />
      </Switch>
    </WorkflowProvider>
  );
};

export default routes;
