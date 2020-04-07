import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../circuit.svg";

const Navigation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;

   background: #457ccf;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const BrandLogo = styled.div`
  width: 30%;
  justify-content: start;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-left: 20px;
  align-items: center;

  img {
    object-fit: contain;
    height: 110%;
  }

  h1 {
    padding-left: 20px;
    font-size: 25px;
    font-weight: bold;

      text-transform: uppercase;
  }
`;

const NavList = styled.ul`
  width: 37%;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  list-style-type: none;
  padding-right: 10px;

  li {
    color: white;
  }
`;

const StyledLink = styled(Link)`
   color: white;
  text-decoration: none;
  font-size: 15px;
  font-weight: bold;

    text-transform: uppercase;
`;

class Navbar extends Component {
  render() {
    return (
      <Navigation>
        <BrandLogo>
          <img src={logo} />

          <h1>Logically</h1>
        </BrandLogo>
        <NavList>
          <li>
            <StyledLink to="/">Home</StyledLink>
          </li>
          <li>
             <StyledLink to="/sketch">New sketch</StyledLink> 
          </li>
          <li>
             <StyledLink to="/examples">Examples</StyledLink> 
          </li>
          <li>
             <StyledLink to="/howto">How to</StyledLink> 
          </li>
        </NavList>
      </Navigation>
    );
  }
}

export default Navbar;
