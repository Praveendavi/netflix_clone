import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Signup from './components/pages/Signup'
import NotFound from './components/pages/NotFound'
import Signin from './components/pages/Signin'
import Logout from './components/pages/Logout'
import Protected from './components/pages/Protected'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signin" component={Signin} ></Route>
        <Route exact path="/logout" component={Logout} ></Route>
        <Protected exact path="/" component={Home} />
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
