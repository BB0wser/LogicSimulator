import React, { Component } from "react";
import ReactDOM from "react-dom";/*important libry*/
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import logo from '../../../circuit.svg';
import and from '../../../Logos/and.svg';


class SketchBoard extends Component {

/*SketchBoard setup and main container*/
  componentDidMount() { }

    constructor(props) {
      super(props);
      this.state = {

        MainContainer: {
          backgroundColor: "#282c34",
          position: "relative",
          display: "flex",
          minHeight: "100vh"
        },
        showMenu: false,
        ObjectMap: []
      };
      this._createObject = this._createObject.bind(this);
      this._createBox = this._createBox.bind(this);
      this._buttonCreateBox1 = this._buttonCreateBox1.bind(this);
      this._dragTask = this._dragTask.bind(this);
      this.showMenu = this.showMenu.bind(this);
      this.closeMenu = this.closeMenu.bind(this);
      this.buttonDrawLine = this._buttonDrawLine.bind(this);
    }



/* handles the expansion and collapse of the menu for:
      adding gates
      connecting gates
      deleting gates*/
    showMenu(event) {
      event.preventDefault();

      this.setState({ showMenu: true }, () => {
        document.addEventListener('click', this.closeMenu);
      });
    }

    closeMenu(event) {

      if (!this.dropdownMenu.contains(event.target)) {

        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });

      }
    }

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
      );}

      _buttonCreateBox2 = () => {
        this._createObject(
          this._createBox({
            backgroundColor: "pink",
            width: "100px",
            height: "100px"
          })
        );}

        _buttonCreateBox3 = () => {
          this._createObject(
            this._createBox({
              backgroundColor: "purple",
              width: "100px",
              height: "100px"
            })
          );}


/*attempt to draw a line for gate connections. Currently does not work*/
          _buttonDrawLine = () => {
            var line = new Konva.Line({
              x: 100,
              y: 50,
              points: [73, 70, 340, 23, 450, 60, 500, 20],
              stroke: 'red',
              tension: 1
            });
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



    render() {
      return (
        /* displays the canvas for working with the gates and the menus and buttons*/

        /*Also home of the "dropdown" menu to add/delete gates and connections
        Note: delete does not currently work. The button at the moment
        is merely a placeholder. Same with connect two gates button*/
        <div style={this.state.MainContainer}>
          <button type="button" onClick={this._buttonCreateBox1}>
            Create gate
          </button>
          <button onClick={this.showMenu}>
            Show menu
          </button>
          {
            this.state.showMenu
              ? (
                <div
                  className="menu"
                  ref={(element) => {
                    this.dropdownMenu = element;
                  }}
                >

                  <button type="button" onClick={this._buttonCreateBox1}>
                  Create blue gate
          </button>
                  <button type="button" onClick={this._buttonCreateBox2}>
                    Create  pink gate
          </button><button type="button" onClick={this._buttonCreateBox3}>
                    Create purple gate
          </button><button type="button" onClick={this._buttonDrawLine}>
                    Connect two gates
          </button><button type ="button" onClick={this.props.onDelete}>
                    Delete Gate
          </button>
                </div>
              )
              : (
                null
              )
          }
          {this.state.ObjectMap.map((item, index) => {
            return item;
          })}
        </div>
      );
    }
  }


  ReactDOM.render(<SketchBoard />, document.getElementById("root"));

export default SketchBoard;
