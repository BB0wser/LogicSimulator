import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import logo from "../../../circuit.svg";
import idea from "../../../Logos/idea.svg";
import examples from "../../../Logos/examples.svg";
import plus from "../../../Logos/plus.svg";
import styled from "styled-components";

const Navbox = styled(Link)`
  height: 33vh;

 width: 33vh;
  background: #b6d3ff;
  text-decoration: none;
  position: relative;

 justify-content: center;

  div {
    text-decoration: none;
    underline: none;
    color: white;
    font-size: 22px;
    font-weight: bold;
  }

  img {
    height: 40%;
    width: 40%;
    left: 30%;
    top: 30%
    position: absolute;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 50px;
  height: calc(100%-50px);
  bottom: 0;
  width: 100%;
`;

const NavboxContainer = styled.div`
  position: absolute;
  width: 80%;

   height: 50%;
  top: 0;
  padding-left: 10%;
  padding-right: 10%;

  background: white;

   display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledLink = styled(Link)`
   color: white;
  text-decoration: none;
  font-size: 15px;
  font-weight: bold;

    text-transform: uppercase;
`;

const TextContainer = styled.div`
  width: 90%;
  position: absolute;

   height: 50%;

  top: 50%;

   padding-right: 5%;
  padding-left: 5%;

  background: yellow;

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
      <Container>
        <NavboxContainer>
          <Navbox to="/sketch">
            <div>Create a new sketch</div>
            <img src={plus} />
          </Navbox>
          <Navbox to="/examples">
            <div>Go to examples</div>
            <img src={examples} />
          </Navbox>
          <Navbox to="/howto">
            <div>How to use</div>
            <img src={idea} />
          </Navbox>
        </NavboxContainer>
        <TextContainer>
          <img src={logo} />
          <p>
            Welcome to the best logic circuit simulator there is,{" "}
            <code>Logically!</code>
          </p>
        </TextContainer>
      </Container>
    );
  }
}

export default Home;
