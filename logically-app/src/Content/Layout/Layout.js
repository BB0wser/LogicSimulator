import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Layout.module.css";

class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <ul id="nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
             <Link to="/examples">Examples</Link> 
          </li>
          <li>
             <Link to="/howto">How to</Link> 
          </li>
          <li>
             <Link to="/sketch">New sketch</Link> 
          </li>
           
        </ul>
      </div>
    );
  }
}

export default Navbar;
