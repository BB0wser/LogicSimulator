import React, { Component } from "react";
import { FaAlignRight } from 'react-icons/fa';

import "./Layout.module.css";

class Navbar extends Component{
  state = {
      toggle:false
  }
  Toggle = () => {
      this.setState({toggle:!this.state.toggle})
  }
    render() {
        return (
          <>
            <div className="navBar">
            <button onClick={this.Toggle}>
                        <FaAlignRight />
                    </button>
              <ul className={this.state.toggle ? "nav-links show-nav" : "nav-links"}>
                <li><a href="/">Home</a></li>
                <li><a href="/examples">Examples</a></li>
                <li><a href="/howto">How-To</a></li>
                <li><a href="/sketch">New-Sketch</a></li>
              </ul>
            </div>
            </>
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
