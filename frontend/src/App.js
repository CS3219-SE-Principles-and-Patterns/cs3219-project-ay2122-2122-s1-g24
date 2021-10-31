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


const PeerPrepContext = React.createContext();
 const initialState = { user: { name: 'login' }, token: "", question: "" };

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
            <Route path={'/logout'} component={SignOut}></Route>
          </Switch>
      </Router>
    </div>
  );
  }
export default App;
