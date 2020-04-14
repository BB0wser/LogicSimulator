import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import logo from "../../../circuit.svg";
import idea from "../../../Logos/idea.svg";
import examples from "../../../Logos/examples.svg";
import plus from "../../../Logos/plus.svg";
import styled from "styled-components";
import axios from "../../../axios-logically";

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
  constructor() {
    super();

    this.state = {
      logic: {
        gates: ["or", "and"],
        connections: [
          ["input0", "gate0"],
          ["input1", "gate0"],
          ["input2", "gate1"],
          ["gate0", "gate1"]
        ],
        inputs: [true, false, false],
        output: true,
        truth_table: {}
      }
    };
  }

  displayError = () => {
    this.setState({ error: "Your request failed. Please try again later." });
  };

  addBookHandler = book => {
    axios
      .post("/", this.state.logic)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        this.displayError();
      });
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
        </NavboxContainer>
        <TextContainer>
          <img src={logo} />
          <p>
            Welcome to the best logic circuit simulator there is,{" "}
            <code>Logically!</code>
            <button onClick={this.addBookHandler}>Testing json</button>
          </p>
        </TextContainer>
      </Container>
    );
  }
}

export default Home;
