import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import logo from '../../../circuit.svg';
import styled from 'styled-components';

const Navbox = styled.div`height: 150px;   background: red;   justify-content: center; `;
const NavboxContainer = styled.div`width: 90%;   height: 50%;   padding-right: 5%; padding-left: 5%; grid-column-gap: 25px; background: #F0FFFF;   display: grid; grid-template-columns: 1fr 1fr 1fr `;

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
    <NavboxContainer>
      <Navbox>
        Div 4
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Go to examples</button>
        </Navbox>
        <Navbox>
        Div 4
        </Navbox>
        <Navbox>
        Div 4
        </Navbox>
    </NavboxContainer>
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
