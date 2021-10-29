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

function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
 
  return (
    <div>
      <Header />
      <Router>
          <Switch>
            <Route exact path={'/'} user={user} component={homepage}></Route>
            <Route exact path={'/room'} component={room}></Route>
            <Route exact path={'/login'} component={SignIn}></Route>
            <Route path={'/setAuth'} component={SetToken}></Route>
          </Switch>
      </Router>
    </div>
  );
  }
export default App;
