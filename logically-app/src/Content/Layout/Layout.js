import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;

   background: blue;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const BrandLogo = styled.div`
  width: 200px;
  background-color: green;
`;

const NavList = styled.ul`
  width: 450px;

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
  font-size: 18px;
  font-weight: bold;

    text-transform: uppercase;
`;

class Navbar extends Component {
  render() {
    return (
      <Navigation>
        <BrandLogo>Logo</BrandLogo>
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
