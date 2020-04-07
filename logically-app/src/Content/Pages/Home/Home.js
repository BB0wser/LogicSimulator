import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import logo from "../../../circuit.svg";
import idea from "../../../Logos/idea.svg";
import examples from "../../../Logos/examples.svg";
import plus from "../../../Logos/plus.svg";
import styled from "styled-components";

const Navbox = styled.div`height: 33vh;  width: 33vh; background: #ADD8E6;   justify-content: center; `;
const Image = styled.img`
  height: 75px;
  width: 75px;
  margin-top: 20px;
`;
const NavboxContainer = styled.div`
  position: absolute;
  width: 90%;

   height: 55%;

   padding-right: 5%;
  padding-left: 5%;
  padding-top: 30px;
  padding-bottom: 30px;
  background: red;

   display: flex;
  justify-content: space-around;
`;

class Home extends Component {
  state = {
    redirect: false
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      this.props.history.push("/howto");
    }
  };

  render() {
    return (
      <div className="App">
        <NavboxContainer>
          <Link to="/sketch">
            <Navbox>
              <div>Create a new sketch</div>
              <Image src={plus} />
            </Navbox>
          </Link>
          <Link to="/examples">
            <Navbox>
              <div>Go to examples</div>
              <Image src={examples} />
            </Navbox>
          </Link>
          <Link to="/howto">
            <Navbox>
              <div>How to use</div>
              <Image src={idea} />
            </Navbox>
          </Link>
        </NavboxContainer>
        <div>
          <img src={logo} className="Logically-logo" alt="logo" />
          <p>
            Welcome to the best logic circuit simulator there is,{" "}
            <code>Logically!</code>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
