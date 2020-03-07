import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Content/Pages/Home/Home";
import Examples from "./Content/Pages/Examples/Examples";
import './App.css';

/*
class App extends Component {
render() {
  return (
    <div>
      <Router>
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
      </Router>
    </div>
  );
}
}
*/

function App() {
  return (
    <div>
      <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/examples" exact component={Examples} />
            </Switch>
      </Router>
    </div>
  );
}

export default App;
