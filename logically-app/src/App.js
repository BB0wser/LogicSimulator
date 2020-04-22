import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import Toolbar from "./Toolbar/Toolbar";
import Home from "./Content/Pages/Home/Home";
import Examples from "./Content/Pages/Examples/Examples";
import Navbar from "./Content/Layout/Layout";
import { SketchBoard } from "./Content/Pages/SketchBoard/SketchBoard";
import "./App.css";
import styled from "styled-components";

/*
const Container = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
`;
*/

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/examples" exact component={Examples} />
          <Route path="/sketch" exact component={SketchBoard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
