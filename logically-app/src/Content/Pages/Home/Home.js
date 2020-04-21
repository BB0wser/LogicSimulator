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
    font-size: 20px;
    line-height: 1.6;
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
            Welcome to the <b>best logic circuit simulator</b> there is,{" "}
            <code>Logically!</code>
            This website is a computer circuit simulator, useful for Computer
            Scientists, Electrical Engineers, and anyone who wishes to learn!
            Use the multiple <b>gate types</b>, adjust your <b>inputs</b>, and
            generate the
            <b> truth tables</b>! If you're not sure where to begin, or want to
            learn more about how to use the website, head over to our{" "}
            <b>examples</b> page! Visit our <b>sketch page</b> to start creating
            your own circuits!
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
