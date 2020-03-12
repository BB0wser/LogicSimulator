import React, { Component } from "react";

import "./Layout.module.css";

class Navbar extends Component{
    render() {
        return (
            <div className="nav">
              <ul id="nav">

                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
        );
    }
}

export default Navbar;
