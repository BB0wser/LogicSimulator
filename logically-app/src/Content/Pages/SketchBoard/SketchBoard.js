import React, { Component } from "react";
import ReactDOM from "react-dom";/*important libry*/
import logo from '../../../circuit.svg';

class SketchBoard extends Component {
componentDidMount(){}/*for placing nodes*/
constructor(props){
  super(props);
  this.state = {
     MainContainer: {
       backgroundColor: "#282c34",
       position: "relative",
       display: "flex",
       minHeight: "100vh"
     },
     ObjectMap: []
   };
   this._createObject = this._createObject.bind(this);
    this._createBox = this._createBox.bind(this);
    this._buttonCreateBox1 = this._buttonCreateBox1.bind(this);
    this._dragTask = this._dragTask.bind(this);
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
         backgroundColor: "white",
         width: "100px",
         height: "100px"
       })
     );
   };

render(){
return(


  <div style={this.state.MainContainer}>
          <button type="button" onClick={this._buttonCreateBox1}>
            Click Me!
          </button>
          {this.state.ObjectMap.map((item, index) => {
            return item;
          })}
        </div>
      );
    }
  }

  ReactDOM.render(<SketchBoard />, document.getElementById("root"));

export default SketchBoard;
