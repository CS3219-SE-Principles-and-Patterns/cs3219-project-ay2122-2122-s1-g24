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

function App() {
  const [token, setToken] = useState();
  if (!token) {

      return (
      <div>
      <Header />
      <SignIn setToken={setToken} />
      </div>)
  }
  return (
    <div>
      <Header />
      <Router>
          <Switch>
            <Route exact path={'/'} component={homepage}></Route>
            <Route exact path={'/room'} component={room}></Route>
            <Route exact path={'/login'} component={SignIn}></Route>
          </Switch>
      </Router>
    </div>
  );
  }
export default App;
