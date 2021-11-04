import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../component/navbar';

const PublicRoute = ({
  component: Component,
  ...rest
}) => (
    <Route
      component={(props) => (
        <div>
          <Header />
          <Component {...props} />
        </div>
      )}
      {...rest}
    />
);

export default PublicRoute;
