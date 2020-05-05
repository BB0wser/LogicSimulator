import React, { Component } from "react";
import Line from "./Elements/Line";
import URLImage from "./Elements/Image";
//import Board from "./Elements/Board";
import ReactDOM from "react-dom"; /*important libry*/
import { Stage, Layer, Circle, Shape, Rect, Text, Image } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import logo from "../../../circuit.svg";
import and from "../../../Logos/and.svg";
import styled from "styled-components";
import axios from "../../../axios-logically";
import { Board } from "./SketchyBoardy";

const Button = styled.button`
  position: relative;
  background-color: #b6d3ff;
  color: black;
  font-size: 20px;
  text-align: center;

  width: 100%;
  height: 65px;

  text-transform: uppercase;
  filter: drop-shadow(0 0 0.75rem blue);
  border-radius: 5px;
`;

const SmallerButton = styled.button`
  position: relative;
  background-color: #000033;
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-align: center;

  width: 100%;
  height: 45px;

  text-transform: uppercase;
  border: 1px solid black;
`;

const Container = styled.div`
  position: absolute;
  top: 50px;
  height: calc(100%-50px);
  bottom: 0;
  width: 100%;
  display: flex;
  background: #282c34;
`;

const Sidebar = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  bottom: 0;
  width: 250px;
  display: flex;
  flex-direction: column;

  background: #f0f8ff;
`;

const Input = styled.input`
  position: relative;
  background-color: white;
  color: black;
  font-size: 20px;

  width: calc(100%-0.75rem);
  height: 40px;
  text-align: center;

  text-transform: uppercase;
  filter: drop-shadow(0 0 0.75rem blue);
`;

class SketchBoard extends Component {
  /*SketchBoard setup and main container*/
  componentDidMount() {}
  componentWillMount() {
    console.log("Component WILL MOUNT!");
  }

  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("Component WILL UPDATE!");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Component DID UPDATE!");
  }
  componentWillUnmount() {
    console.log("Component WILL UNMOUNT!");
  }

  constructor(props) {
    super(props);
    this.state = {
      showGates: false,
      showConnections: false,
      drawTheLine: false,
      identifiers: {
        andindentifier: 0,
        orindentifier: 0,
        notindentifier: 0,
        xorindentifier: 0
      },
      gates: {
        and: [],
        or: [],
        not: [],
        xor: []
      },
      lines: [],
      logic: {
        gates: ["or", "and"],
        connections: [
          ["input0", "gate0"],
          ["input1", "gate0"],
          ["input2", "gate1"],
          ["gate0", "gate1"]
        ],
        inputs: [true, false, false],
        output: true,
        truth_table: {}
      },
      file: {
        filename: "save.json",
        example: false
      },
      saveas: ""
    };


  }

  /* For sending requests to the backend*/
  displayError = () => {
    this.setState({ error: "Your request failed. Please try again later." });
  };

  addBookHandler = book => {
    axios
      .post("/", this.state.logic)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        this.displayError();
      });
  };

  saveFile = file => {
    axios
      .post("/save", this.state.saveas)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        this.displayError();
      });
  };

  loadFile = file => {
    axios
      .post("/load", this.state.file)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        this.displayError();
      });
  };

  generateKey = pre => {
    return new Date().getTime();
  };

  /*handling the input section*/
  inputChangedHandler = event => {
    const target = event.target;

    if (target.name === "saveas") {
      const saveas = {
        ...this.state.saveas
      };
      saveas.value = event.target.value;
      console.log(saveas.value);
      this.setState({ saveas: saveas });
    } else {
      const file = {
        ...this.state.file
      };
      file.filename = event.target.value;
      this.setState({ file: file });
    }
  };

  render() {
    return (
      /* displays the canvas for working with the gates and the menus and buttons*/
<Board/>

    );
  }
}

export default SketchBoard;
