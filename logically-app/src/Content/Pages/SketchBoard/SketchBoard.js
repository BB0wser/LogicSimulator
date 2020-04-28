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

    this.generateShapes = this.generateShapes.bind(this);
    this.generateShapes2 = this.generateShapes2.bind(this);
    this.generateShapes3 = this.generateShapes3.bind(this);
    this.generateShapes4 = this.generateShapes4.bind(this);
    this.generateLine = this.generateLine.bind(this);
    this.somethingLine = this.somethingLine.bind(this);
    this.showGates = this.showGates.bind(this);
    this.closeGates = this.closeGates.bind(this);
    this.showConnections = this.showConnections.bind(this);
    this.closeConnections = this.closeConnections.bind(this);
  }

  /* handles the expansion and collapse of the menu for:
      adding gates
      connecting gates
      deleting gates*/
  showGates(event) {
    event.preventDefault();

    this.setState({ showGates: true }, () => {
      document.addEventListener("click", this.closeGates);
    });
  }

  closeGates(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showGates: false }, () => {
        document.removeEventListener("click", this.closeGates);
      });
    }
  }

  showConnections(event) {
    event.preventDefault();

    this.setState({ showConnections: true }, () => {
      document.addEventListener("click", this.closeConnections);
    });
  }

  closeConnections(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showConnections: false }, () => {
        document.removeEventListener("click", this.closeConnections);
      });
    }
  }

  updateDrawTheLine() {
    this.setState(prevState => ({
      drawTheLine: !prevState.drawTheLine
    }));
  }

  getDrawTheLine() {
    return this.state.drawTheLine;
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

  /* Where the object map is initialized and set up everytime a box is Created
boxes will later be replaced with svg gate figures, but encountered some trouble there*/

  generateShapes = event => {
    const shapes = [];
    this.state.identifiers.andindentifier =
      this.state.identifiers.andindentifier + 1;

    shapes.push({
      id: this.state.identifiers.andindentifier,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });
    const newAnd = shapes.concat([[10, 10]]);
    this.setState(prevState => ({
      and: newAnd
    }));
    console.log(newAnd);
  };

  generateLine = event => {
    if (this.state.drawTheLine == true) {
      const pos = event.target.getStage().getPointerPosition();
      const newLines = this.state.lines.concat([[pos, pos]]);
      this.setState(prevState => ({
        lines: newLines,
        drawTheLine: true
      }));
    }
  };

  somethingLine = event => {
    if (this.state.drawTheLine == true) {
      return;
    }
    const pos = event.target.getStage().getPointerPosition();
    const lines = {
      ...this.state.lines
    };
    const lastLine = lines[lines.length - 1].slice();
    lastLine[1] = pos;

    const newLines = lines.slice();
    newLines[newLines.length - 1] = lastLine;
    this.setState({
      lines: newLines
    });
  };

  generateShapes2 = () => {
    const shapes = [];
    this.state.identifiers.orindentifier =
      this.state.identifiers.orindentifier + 1;
    shapes.push({
      id: this.state.orindentifier,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });
    const newOr = shapes.concat([[10, 10]]);
    this.setState(prevState => ({
      or: newOr
    }));
    console.log(newOr);
  };

  generateShapes3 = () => {
    const shapes = [];
    this.state.identifiers.notindentifier =
      this.state.identifiers.notindentifier + 1;
    shapes.push({
      id: this.state.identifiers.notindentifier,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });
    const newNot = shapes.concat([[10, 10]]);
    this.setState(prevState => ({
      or: newNot
    }));
    console.log(newNot);
  };

  generateShapes4 = () => {
    const shapes = [];
    this.state.identifiers.xorindentifier =
      this.state.identifiers.xorindentifier + 1;
    shapes.push({
      id: this.state.identifiers.xorindentifier,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });
    const newXor = shapes.concat([[10, 10]]);
    this.setState(prevState => ({
      xor: newXor
    }));
    console.log(newXor);
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
      <Container>
        <Sidebar>
          <Button onClick={this.showGates}>Create Gate</Button>
          {this.state.showGates ? (
            <div
              className="menu"
              ref={element => {
                this.dropdownMenu = element;
              }}
            >
              <SmallerButton type="button" onClick={this.generateShapes}>
                AND
              </SmallerButton>
              <SmallerButton type="button" onClick={this.generateShapes2}>
                OR
              </SmallerButton>
              <SmallerButton type="button" onClick={this.generateShapes3}>
                NOT
              </SmallerButton>
              <SmallerButton type="button" onClick={this.generateShapes4}>
                EXCLUSIVE OR
              </SmallerButton>
            </div>
          ) : null}
          <Button type="button" onClick={this.props.onDelete}>
            Delete Gate
          </Button>
          <Button onClick={this.showConnections}>Create Connection</Button>
          {this.state.showConnections ? (
            <div
              className="menu"
              ref={element => {
                this.dropdownMenu = element;
              }}
            >
              <SmallerButton type="button">Line</SmallerButton>
              <SmallerButton type="button">Bus</SmallerButton>
              <SmallerButton type="button">Point</SmallerButton>
            </div>
          ) : null}
          <Button type="button">View Truth Table</Button>
          <Button type="button">Add LED</Button>
          <Button type="button">View Boolean Expression</Button>
          <Input
            name="load"
            type="file"
            onChange={event => {
              this.inputChangedHandler(event);
            }}
          ></Input>
          <Button type="button" onClick={this.loadFile}>
            Load file
          </Button>
          <Input
            name="saveas"
            type="text"
            onChange={event => {
              this.inputChangedHandler(event);
            }}
          ></Input>
          <Button type="button" onClick={this.saveFile}>
            Save to PDF
          </Button>
        </Sidebar>
        <Stage
          width="308px"
          height="703px"
          onMouseDown={this.generateLine}
          onMouseMove={this.somethingLine}
          onMouseUp={this.setState(e => ({
            drawTheLine: false
          }))}
        >
          <Layer>
            {this.state.lines.map(l => (
              <Line points={l} />
            ))}
            {this.state.gates.and.map(shape => (
              <Circle
                x={shape.x}
                y={shape.y}
                key={shape.id}
                fill="green"
                radius={20}
                shadowBlur={10}
                draggable
              />
            ))}
            {this.state.gates.or.map(shape2 => (
              <Rect
                x={shape2.x}
                y={shape2.y}
                key={shape2.id}
                fill="red"
                width={25}
                height={25}
                shadowBlur={10}
                draggable
              />
            ))}
            {this.state.gates.not.map(shape3 => (
              <Rect
                x={shape3.x}
                y={shape3.y}
                key={shape3.id}
                fill="blue"
                width={25}
                height={25}
                shadowBlur={10}
                draggable
              />
            ))}
            {this.state.gates.xor.map(shape4 => (
              <Circle
                x={shape4.x}
                y={shape4.y}
                key={shape4.id}
                fill="purple"
                radius={20}
                shadowBlur={10}
                draggable
              />
            ))}
          </Layer>
        </Stage>
      </Container>
    );
  }
}

export default SketchBoard;
