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

/*
const toolbarStyle = {
  display: 'flex',
  width: '1000px',
  backgroundColor: '#d6e2ea',
  padding: '6px 8px'
};

class Toolbar extends Component {
  render() {
    return (
      <div style={toolbarStyle}>
        <button>Home</button>
        <button>examples</button>
        <button>How-to</button>
        <div style={{ flex: 1 }}></div>
        <button>Sketch</button>
      </div>
    );
  }
}

export default Toolbar;
*/
