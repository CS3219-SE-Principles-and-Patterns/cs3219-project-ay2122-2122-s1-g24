import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import homepage from './component/homepage/homepage'
import room from './component/room/room'
import SignIn from './component/Auth/signin';
import SetToken from './component/Auth/setAuth';
import { useAuth } from './context/AuthContext'
import { CookiesProvider } from 'react-cookie'
import PageNotFound from './error/404Page'
import unathorised from './error/unAuthorised'
import Header from './component/navbar';

const App = () => {
  const { login, loggedIn, logout, user, token } = useAuth();

  return (
    <div>
      <CookiesProvider>
        <Header />
        <Router>
          <Switch>
            <Route exact path={'/'} useAuth={useAuth} component={homepage} />
            <Route exact path={'/room/:difficulty/:id'} component={room} />
            <Route exact path={'/login'} component={SignIn} />
            <Route
              path={'/setAuth'}
              login={login}
              loggedIn={loggedIn}
              logout={logout}
              user={user}
              token={token}
              component={SetToken}
            />
            <Route exact path={'/unauthorised'} component={unathorised} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </CookiesProvider>
    </div>
  );
};

export default App;
