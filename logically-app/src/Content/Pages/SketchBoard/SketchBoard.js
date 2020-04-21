import React, { Component } from "react";
import ReactDOM from "react-dom"; /*important libry*/
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import Example from "../../../UI/Button/Example";
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

class SketchBoard extends Component {
  /*SketchBoard setup and main container*/
  componentDidMount() {}

  constructor(props) {
    super(props);
    this.state = {
      showGates: false,
      showConnections: false,
      ObjectMap: [],
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
      }
    };
    this._createObject = this._createObject.bind(this);
    this._createBox = this._createBox.bind(this);
    this._buttonCreateBox1 = this._buttonCreateBox1.bind(this);
    this._dragTask = this._dragTask.bind(this);
    this.showGates = this.showGates.bind(this);
    this.closeGates = this.closeGates.bind(this);
    this.showConnections = this.showConnections.bind(this);
    this.closeConnections = this.closeConnections.bind(this);
    this.buttonDrawLine = this._buttonDrawLine.bind(this);
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

  generateKey = pre => {
    return new Date().getTime();
  };

  /* Where the object map is initialized and set up everytime a box is Created
boxes will later be replaced with svg gate figures, but encountered some trouble there*/
  _createObject = object => {
    var ObjectMap = this.state.ObjectMap;
    ObjectMap.push(object);
    this.setState({ ObjectMap: ObjectMap });
  };

  _createBox = style => {
    var object = {
      position: "absolute",
      top: this.state.positionX,
      left: this.state.positionY
    };
    var styleObject = Object.assign({}, object, style);
    return (
      <div
        key={this.generateKey(object)}
        style={styleObject}
        draggable="true"
        onDragEnd={event => {
          this._dragTask(event);
        }}
      />
    );
  };

  /* handles dragging the boxes*/
  _dragTask(event) {
    event.target.style.top = event.clientY + "px";
    event.target.style.left = event.clientX + "px";
  }
  /*creates the different color boxes that will later become the logic gates*/
  _buttonCreateBox1 = () => {
    this._createObject(
      this._createBox({
        backgroundColor: "blue",
        width: "100px",
        height: "100px"
      })
    );
  };

  _buttonCreateBox2 = () => {
    this._createObject(
      this._createBox({
        backgroundColor: "pink",
        width: "100px",
        height: "100px"
      })
    );
  };

  _buttonCreateBox3 = () => {
    this._createObject(
      this._createBox({
        backgroundColor: "purple",
        width: "100px",
        height: "100px"
      })
    );
  };

  _buttonCreateBox4 = () => {
    this._createObject(
      this._createBox({
        backgroundColor: "blue",
        width: "100px",
        height: "100px"
      })
    );
  };

  /*attempt to draw a line for gate connections. Currently does not work*/
  _buttonDrawLine = () => {
    var line = new Konva.Line({
      x: 100,
      y: 50,
      points: [73, 70, 340, 23, 450, 60, 500, 20],
      stroke: "red",
      tension: 1
    });
  };

  render() {
    return (
      /* displays the canvas for working with the gates and the menus and buttons*/

      /*Also home of the "dropdown" menu to add/delete gates and connections
        Note: delete does not currently work. The button at the moment
        is merely a placeholder. Same with connect two gates button*/
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
              <SmallerButton type="button" onClick={this._buttonCreateBox1}>
                AND
              </SmallerButton>
              <SmallerButton type="button" onClick={this._buttonCreateBox2}>
                OR
              </SmallerButton>
              <SmallerButton type="button" onClick={this._buttonCreateBox3}>
                NOT
              </SmallerButton>
              <SmallerButton type="button" onClick={this._buttonDrawLine}>
                EXCLUSIVE OR
              </SmallerButton>
            </div>
          ) : null}
          {this.state.ObjectMap.map((item, index) => {
            return item;
          })}
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
              <SmallerButton type="button" onClick={this._buttonCreateBox1}>
                Line
              </SmallerButton>
              <SmallerButton type="button" onClick={this._buttonCreateBox2}>
                Bus
              </SmallerButton>
              <SmallerButton type="button" onClick={this._buttonCreateBox3}>
                Point
              </SmallerButton>
            </div>
          ) : null}
          <Button type="button">View Truth Table</Button>
          <Button type="button">Add LED</Button>
          <Button type="button">View Boolean Expression</Button>
          <Button type="button">Save to PDF</Button>
          <button onClick={this.addBookHandler}>Testing json</button>
        </Sidebar>
      </Container>
    );
  }
}

ReactDOM.render(<SketchBoard />, document.getElementById("root"));

export default SketchBoard;
