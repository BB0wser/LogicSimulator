import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import Toolbar from "./Toolbar/Toolbar";
import Home from "./Content/Pages/Home/Home";
import Examples from "./Content/Pages/Examples/Examples";
import HowTo from "./Content/Pages/HowTo/HowTo";
import Navbar from "./Content/Layout/Layout";
import SketchBoard from "./Content/Pages/SketchBoard/SketchBoard";
import "./App.css";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100% - 50px;
`;

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/examples" exact component={Examples} />
            <Route path="/howto" exact component={HowTo} />
            <Route path="/sketch" exact component={SketchBoard} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
