import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom'
import homepage from './component/homepage'
import room from './component/room'
import Header from './component/navbar';

function App() {
  return (
    <div>
      <Header />
      <Router>
          <Switch>
            <Route exact path={'/'} component={homepage}></Route>
            <Route exact path={'/room'} component={room}></Route>
          </Switch>
      </Router>
    </div>
  );
  }
export default App;
