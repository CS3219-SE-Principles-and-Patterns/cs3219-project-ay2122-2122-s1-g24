import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import homepage from './component/homepage/homepage'
import room from './component/room/room'
import SignIn from './component/Auth/signin';
import SetToken from './component/Auth/setAuth';
import { useAuth } from './context/AuthContext'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import PageNotFound from './error/404Page'
import unathorised from './error/unAuthorised'

const App = () => {
  const { login, loggedIn, logout, user, token } = useAuth();

  return (
    <CookiesProvider>
      <Router>
        <div>
          <Switch>
            <PublicRoute exact path={'/'} useAuth={useAuth} component={homepage} />
            <PrivateRoute exact path={'/room/:difficulty/:id'} component={room} />
            <PublicRoute exact path={'/login'} component={SignIn} />
            <PublicRoute
              path={'/setAuth'}
              login={login}
              loggedIn={loggedIn}
              logout={logout}
              user={user}
              token={token}
              component={SetToken}
            />
            <PublicRoute exact path={'/unauthorised'} component={unathorised} />
            <PublicRoute component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </CookiesProvider>
  );
};

export default App;
