import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import Toolbar from "./Toolbar/Toolbar";
import Home from "./Content/Pages/Home/Home";
import Examples from "./Content/Pages/Examples/Examples";
import HowTo from "./Content/Pages/HowTo/HowTo";
import Navbar from "./Content/Layout/Layout";
import SketchBoard from "./Content/Pages/SketchBoard/SketchBoard";
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
        <Navbar/>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/examples" exact component={Examples} />
              <Route path="/howto" exact component={HowTo} />
              <Route path="/sketch" exact component={SketchBoard} />
            </Switch>
      </Router>
    </div>
  );
}

export default App;
