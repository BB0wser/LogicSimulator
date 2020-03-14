import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import logo from '../../../circuit.svg';

class Examples extends Component {

    state = {
      redirect: false
    }
    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }
    renderRedirect = () => {
      if (this.state.redirect) {
          this.props.history.push("/howto");
      }
    }





render(){

return(
  <div className="App">
    <header className="App-header">
      <img src={logo} className="Logically-logo" alt="logo" />
      <p>
        This shall be the examples page
      </p>
      {this.renderRedirect()}
      <button onClick={this.setRedirect}>Go to HowTo</button>
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

export default Examples;
