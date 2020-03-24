import React, { Component } from "react";

import "./Layout.module.css";

class Navbar extends Component{
    render() {
        return (
            <div className="nav">
              <ul id="nav">

                <li><a href="/">Home</a></li>
                <li><a href="/examples">Examples</a></li>
                <li><a href="/howto">How-To</a></li>
                <li><a href="/sketch">New-Sketch</a></li>
              </ul>
            </div>
        );
    }
}

export default Navbar;
