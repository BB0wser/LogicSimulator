import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import logo from '../../../circuit.svg';

class Home extends Component {

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
      return <Redirect to='/examples' />
    }
  }


render(){

return(
  <div className="App">
    <header className="App-header">
      <img src={logo} className="Logically-logo" alt="logo" />
      <p>
        Welcome to the best logic circuit simulator there is, <code>Logically!</code>
      </p>
      {this.renderRedirect()}
      <button onClick={this.setRedirect}>Go to examples</button>
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

export default Home;
