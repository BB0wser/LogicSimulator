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
        this.props.history.push("/howto");
    }
  }


render(){

return(
  <div className="App">
    <div>
      <div>
        Div 4
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Go to examples</button>
        </div>
        <div>
        Div 4
        </div>
        <div>
        Div 4
        </div>
    </div>
  <div>
        <img src={logo} className="Logically-logo" alt="logo" />
  <p>
    Welcome to the best logic circuit simulator there is, <code>Logically!</code>
  </p>


  </div>
  </div>

);


}

}

export default Home;
