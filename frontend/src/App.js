import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom'
import homepage from './component/homepage'
import room from './component/room'
import Header from './component/navbar';
import SignIn from './component/signin';
import SetToken from './component/setAuth';
import SignOut from './component/logout'
import {useAuth} from './context/AuthContext'

const PeerPrepContext = React.createContext();
 

function App() {

  const {login, loggedIn, logout,user,token}= useAuth()
  return (
    <div>
      <Header />
      <Router>
          <Switch>
            <Route exact path={'/'} useAuth={useAuth}component={homepage}></Route>
            <Route exact path={'/room'} component={room}></Route>
            <Route exact path={'/login'} component={SignIn}></Route>
            <Route path={'/setAuth'} login={login} loggedIn={loggedIn} logout={logout} user={user} token={token} component={SetToken}></Route>
            <Route path={'/logout'} component={SignOut}></Route>
          </Switch>
      </Router>
    </div>
  );
  }
export default App;
