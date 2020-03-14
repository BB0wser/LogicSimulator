import React, { Component } from "react";
import logo from '../../../circuit.svg';

class SketchBoard extends Component {


render(){

return(
  <div className="App">
    <header className="App-header">
      <img src={logo} className="Logically-logo" alt="logo" />
      <p>
        This is the sketch page!
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>

);


}

}

export default SketchBoard;
