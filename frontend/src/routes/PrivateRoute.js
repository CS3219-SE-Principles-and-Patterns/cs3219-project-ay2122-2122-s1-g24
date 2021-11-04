import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../component/navbar';
import Cookies from 'js-cookie';

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = Cookies.get('isLoggedIn') === 'true';

  return (
    <Route
      component={(props) =>
        isAuthenticated ? (
          <div>
            <Header />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/unauthorised" />
        )
      }
      {...rest}
    />
  );
};

export default PrivateRoute;
