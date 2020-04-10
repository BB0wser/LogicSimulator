import React, { Component } from "react";
import ReactDOM from "react-dom";/*important libry*/
import logo from '../../../circuit.svg';
import and from '../../../Logos/and.svg';
class SketchBoard extends Component {
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
    }




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

    _dragTask(event) {
      event.target.style.top = event.clientY + "px";
      event.target.style.left = event.clientX + "px";
    }

    _buttonCreateBox1 = () => {
      this._createObject(
        this._createBox({
          backgroundColor: "blue",
          width: "100px",
          height: "100px"
        })
      );
    }

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
