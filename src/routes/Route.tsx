import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as RouterDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/Default';

import { useAuth } from '../hooks/auth';

interface RouteProps extends RouterDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const CustomRoute: React.FC<RouteProps> = ({
  component: Component,
  isPrivate = false,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      render={() => {
        return isPrivate === !!user ? (
          <DefaultLayout>
            <Component />
          </DefaultLayout>
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/signin' : '/products' }} />
        );
      }}
      {...rest}
    />
  );
};

export default CustomRoute;
