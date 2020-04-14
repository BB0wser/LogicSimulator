import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import logo from "../../../circuit.svg";

const Container = styled.div`
  position: absolute;
  top: 50px;
  height: calc(100%-50px);
  bottom: 0;
  width: 100%;
`;

const ExamplesContainer = styled.div`
  position: absolute;
  width: 80%;

   height: 100%;
  top: 0%;
  padding-left: 10%;
  padding-right: 10%;

  background-color: blue;

   display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Navbox = styled.div`
  height: 33vh;

   width: 80%;
  background: #b6d3ff;
  text-decoration: none;
  position: relative;
  border: 2px solid silver;
  margin: 5px;

   justify-content: center;

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
  }
`;

class Examples extends Component {
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
        <ExamplesContainer>
          <Navbox>
            <div>Example 1</div>
          </Navbox>
          <Navbox>
            <div>Example 2</div>
          </Navbox>
          <Navbox>
            <div>Example 3</div>
          </Navbox>
          <Navbox>
            <div>Example 4</div>
          </Navbox>
          <Navbox>
            <div>Example 5</div>
          </Navbox>
        </ExamplesContainer>
      </Container>
    );
  }
}

export default Examples;
