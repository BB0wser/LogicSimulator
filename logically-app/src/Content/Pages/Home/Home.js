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
  border: 2px solid silver;

    div {
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    padding-top: 15px;
    underline: none;
    color: white;
    font-size: 22px;
    font-weight: bold;
  }

  img {
    height: 40%;
    width: 40%;
    left: 30%;
    top: 30%;
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
  top: 50%;
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

  text-align: justify;
  align-items: center;

   text-justify: inter-word;

   height: 50%;

  top: 0%;

   padding-right: 5%;
  padding-left: 5%;

  background: #f0f8ff;

   display: flex;
  justify-content: space-around;

  p {
    padding-left: 5%;
  }
`;

class Home extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <Container>
        <TextContainer>
          <img src={logo} />
          <p>
            Welcome to the best logic circuit simulator there is,{" "}
            <code>Logically!</code>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </TextContainer>
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
      </Container>
    );
  }
}

export default Home;
