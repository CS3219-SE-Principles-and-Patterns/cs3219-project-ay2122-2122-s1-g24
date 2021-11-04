import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom'
import homepage from './component/homepage'
import room from './component/room'

import SignIn from './component/Auth/signin';
import SetToken from './component/Auth/setAuth';
import SignOut from './component/Auth/logout'
import {useAuth} from './context/AuthContext'
import {CookiesProvider} from "react-cookie"
import PageNotFound from './component/404Page'
import unathorised from './component/unAuthorised'
import Header from './component/navbar';
function App() {

    const {login, loggedIn, logout,user,token}= useAuth()
    return (
      <div>
        <CookiesProvider>
        <Header />
        <Router>

            <Switch>
              <Route exact path={'/'} useAuth={useAuth}component={homepage}></Route>
              <Route exact path={'/room/:difficulty/:id'} component={room}></Route>
              <Route exact path={'/login'} component={SignIn}></Route>
              <Route path={'/setAuth'} login={login} loggedIn={loggedIn} logout={logout} user={user} token={token} component={SetToken}></Route>
              <Route path={'/logout'} component={SignOut}></Route>
              <Route exact path={'/unauthorised'} component={unathorised}></Route>
              <Route component={PageNotFound} />
            </Switch>
        </Router>
        </CookiesProvider>
      </div>
    );
}
export default App;
