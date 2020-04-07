import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import "./Layout.module.css";

const Navigation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;

   background: blue;
  display: flex;
  justify-content: space-between;
`;

class Navbar extends Component {
  render() {
    return (
      <Navigation>
        <div></div>
        <div></div>
      </Navigation>
    );
  }
}

export default Navbar;
