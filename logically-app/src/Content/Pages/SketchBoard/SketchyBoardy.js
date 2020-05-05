import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Circle, Shape, Rect, Text, Image } from "react-konva";
import useImage from "use-image";
import styled from "styled-components";

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
  height: 250px;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;

  background: #f0f8ff;
`;
var andindentifier=0;
var orindentifier=0;
var notindentifier=0;
var xorindentifier=0;
function generateShapes() {
  const shapes = [];
orindentifier=orindentifier+1;
    shapes.push({
      id: orindentifier,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });

  return shapes;
}
/*Function to create initial shapes. Pretty sure this only works on the initial setup
  It creates an array that will be returned at the end, and creates a new shape with the and id
  It also updates that id +1 so that each id number will be unique The x: and y: as Math.random just
  randomly place the object somewhere on the stage instead of putting them at set coordinates so that can be
  changed at any time*/
function generateShapes2() {

  const shapes = [];
andindentifier=andindentifier+1;
    shapes.push({
      id: andindentifier,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });

  return shapes;
}
/* same as function above, just for a different gate. These can probably be merged together, but they might
   need to stay seperate because they are seperate shapes and will later have different url identifiers or something like that
   not really set in stone though*/
function generateShapes3() {
  const shapes = [];
notindentifier=notindentifier+1;
    shapes.push({
      id: notindentifier,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });

  return shapes;
}
/*same as functions above*/
function generateShapes4() {
  const shapes = [];
xorindentifier=xorindentifier+1;
    shapes.push({
      id: xorindentifier,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });

  return shapes;
}
/*global variables that really are only used for sketchboard initialization. I think these can
  be removed in our formal implementation*/
const INITIAL_SHAPES = generateShapes();
const INITIAL_SHAPES_TWO = generateShapes2();
const INITIAL_SHAPES_THREE = generateShapes3();
const INITIAL_SHAPES_FOUR = generateShapes4();
const RADIUS = 20;

/* this declares what a line is and how it should be drawn when it is drawn. Points I believe are
   just x and y coordinates */
const Line = ({ points }) => {
  return (
    <Shape
      points={points}
      /* This is just defining what the shape is (which is a line There is a
          line member, but this was easier to create the shape we wanted so this
          defines the shape and size of the line) */
      sceneFunc={(context, shape) => {
        const width = points[1].x - points[0].x;
        const height = points[1].y - points[0].y;
        const dir = Math.sign(height);
        const radius = Math.min(
          RADIUS,
          Math.abs(height / 2),
          Math.abs(width / 2)
        );
        /*these are member functions of the shape class itself found within Konva. This
          first part is creating the first "quadratic curve" in the lines we draw*/
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        context.lineTo(points[0].x + width / 2 - RADIUS, points[0].y);
        context.quadraticCurveTo(
          points[0].x + width / 2,
          points[0].y,
          points[0].x + width / 2,
          points[0].y + dir * radius
        );
        /*this is drawing the second quadratic curve found in the lines we draw*/
        context.lineTo(points[0].x + width / 2, points[1].y - dir * radius);
        context.quadraticCurveTo(
          points[0].x + width / 2,
          points[1].y,
          points[0].x + width / 2 + radius,
          points[1].y
        );
        /*this part is filling in the rest of the line, like the line in between the two curves
          if that makes any sense. */
        context.lineTo(points[1].x, points[1].y);
        context.fillStrokeShape(shape);
      }}
      stroke="black"
      strokeWidth={2}
    />
  );
};

/*this is a declaration of what the URLImage should be so that we could use it in the future
  right now, it is not being used at all, as we were having a hard time getting an array of
  URLImages to show up on the drawing stage. In theory though, this creates an image from a
  URL link based on the image that was passed into the function*/
const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};
/*this function, the very next one, and the var are failed attempts to stop the lines from
  drawing unless we click the line button to draw them. Basically, we wanted some way to force
  the program to only draw lines on the stage when we told it to but we could never get it to work
  properly. This is not really being used anywhere that benefits the progam in any way, and can either
  be left in here or removed, it does not matter*/
var drawTheLine = false;
function updateDrawTheLine(){
  drawTheLine = !drawTheLine;
}
function getDrawTheLine(){
  return drawTheLine;
}
/*this is where the bulk of the work is done*/
export const Board = () => {
  /*these are React hooks that allows us to use a function like this instead of a class
    https://reactjs.org/docs/hooks-state.html
    that is a link to the react website that talks about them and their class equivalant if
    more context is needed on how to switch them over. Basically though, the first part of the const
    is an array, and the second is a method to update the array that should also force the program to
    re render the page (from my understanding but I might be slightly off on that)
    I think this same effect can be achieved by putting the first part into the this.state =
    found within a class*/
  const [isDrawing, setDrawing] = React.useState(false);
     const [lines, setLines] = React.useState([
     ]);


/*the useRef I really could not figure out what it does. I think it just keeps a reference of whats
  on the page at a specific time but I really could not figure out how to convert that into a class or what
  it really even does for that matter. But the dragUrl can be gotten rid of for the time being because we
  currently aren't using the URLImage class which it is used with. stageRef I dont think is being used
  for anything important either.*/
  const dragUrl = React.useRef();
   const stageRef = React.useRef();

   /*these are all just arrays to store and deal with certain componenets rendered on the screen. Images though
   I dont think we are using because that's something that is also associated with URLImage and we can't seem
   to get it working properly */
   const [images, setImages] = React.useState([]);
const [shapes4, setShapes4] = React.useState(INITIAL_SHAPES_FOUR);
const [shapes3, setShapes3] = React.useState(INITIAL_SHAPES_THREE);
const [shapes2, setShapes2] = React.useState(INITIAL_SHAPES_TWO);
  const [shapes, setShapes] = React.useState(INITIAL_SHAPES);
  /*this is useless. This array was used to store the line connections between two circles, but we are not
  using that feature anymore. It is associated with something later in the code that can also be removed*/
  const [connectors, setConnectors] = React.useState([]);
/*I think this was just an array of keys basically. But this array is related the the one above and can also be safely removed*/
  const [fromShapeId, setFromShapeId] = React.useState(null);

  return (
    <div>
    <Container>
        <Sidebar>
          <Button>Create Gate</Button>

              <SmallerButton
                  type="button"
                  onClick={e => {

                       const newAnd = shapes2.concat([[10, 10]]);
                      setShapes2(newAnd);
                    }}
                >
                AND

              </SmallerButton>
              <SmallerButton
                  type="button"
                  onClick={e => {

                   const newOr = shapes.concat([[10, 50]]);
                  setShapes(newOr);
                }} >
                OR
              </SmallerButton>
              <SmallerButton
                    type="button"
                    onClick={e => {

                     const newNot = shapes3.concat([[10, 50]]);
                    setShapes3(newNot);
                  }}>
                NOT
              </SmallerButton>
              <SmallerButton
                    type="button"
                    onClick={e => {

                      const newXor = shapes4.concat([[10, 50]]);
                      setShapes4(newXor);
              }}>
                EXCLUSIVE OR
              </SmallerButton>

          <Button type="button" >
            Delete Gate
          </Button>
          <Button>Create Connection</Button>
              <SmallerButton
                  type="button"

                  onClick={drawTheLine = true}>
                Line
              </SmallerButton>
              <SmallerButton type="button" >
                Bus
              </SmallerButton>
              <SmallerButton type="button" >
                Point
              </SmallerButton>

          <Button type="button">View Truth Table</Button>
          <Button type="button">Add LED</Button>
          <Button type="button">View Boolean Expression</Button>
          <Button type="button">Save to PDF</Button>
          <Button >Testing json</Button>

    <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={e => {

          if(drawTheLine == true){
             const pos = e.target.getStage().getPointerPosition();
             const newLines = lines.concat([[pos, pos]]);
             setLines(newLines);
             setDrawing(true);
           }}}
           onMouseMove={e => {

            if(drawTheLine == true){
             if (!isDrawing) {
               return;
             }

             const pos = e.target.getStage().getPointerPosition();
             const lastLine = lines[lines.length - 1].slice();
             lastLine[1] = pos;

             const newLines = lines.slice();
             newLines[newLines.length - 1] = lastLine;
             setLines(newLines);
           }}}
           onMouseUp={e => {

             drawTheLine = false;
             setDrawing(false);
           }}
        >
      <Layer>

        {lines.map(l => (
       <Line points={l} />
     ))}

        {shapes.map(shape => (
          <Circle
            x={shape.x}
            y={shape.y}
            key={shape.id}
            fill={fromShapeId === shape.id ? "red" : "green"}
            radius={20}
            shadowBlur={10}
            draggable
            onClick={() => {
              if (fromShapeId) {
                const newConnector = {
                  from: fromShapeId,
                  to: shape.id,
                  id: connectors.length
                };
                setConnectors(connectors.concat([newConnector]));
                setFromShapeId(null);
              } else {
                setFromShapeId(shape.id);
              }
            }}
          />
        ))
      }

      {shapes2.map(shape2 => (
          <Rect
            x={shape2.x}
            y={shape2.y}
            key={shape2.id}
            fill="red"
            width={25}
            height={25}
            shadowBlur={10}
            draggable
            onClick={() => {
              if (fromShapeId) {
                const newConnector = {
                  from: fromShapeId,
                  to: shape2.id,
                  id: connectors.length
                };
                setConnectors(connectors.concat([newConnector]));
                setFromShapeId(null);
              } else {
                setFromShapeId(shape2.id);
              }

        }}
        />
      ))}

      {shapes3.map(shape3 => (
          <Rect
            x={shape3.x}
            y={shape3.y}
            key={shape3.id}
            fill="blue"
            width={25}
            height={25}
            shadowBlur={10}
            draggable
            onClick={() => {
              if (fromShapeId) {
                const newConnector = {
                  from: fromShapeId,
                  to: shape3.id,
                  id: connectors.length
                };
                setConnectors(connectors.concat([newConnector]));
                setFromShapeId(null);
              } else {
                setFromShapeId(shape3.id);
              }

        }}
        />
      ))}

      {shapes4.map(shape4 => (
        <Circle
          x={shape4.x}
          y={shape4.y}
          key={shape4.id}
          fill={fromShapeId === shape4.id ? "orange" : "purple"}
          radius={20}
          shadowBlur={10}
          draggable
          onClick={() => {
            if (fromShapeId) {
              const newConnector = {
                from: fromShapeId,
                to: shape4.id,
                id: connectors.length
              };
              setConnectors(connectors.concat([newConnector]));
              setFromShapeId(null);
            } else {
              setFromShapeId(shape4.id);
            }
          }}
        />
      ))
    }
      </Layer>
    </Stage>
    </Sidebar>
  </Container>
</div>
  );
};
