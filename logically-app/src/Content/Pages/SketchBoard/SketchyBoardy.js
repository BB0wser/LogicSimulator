import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Circle, Shape, Rect, Text, Image } from "react-konva";
import useImage from "use-image";
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

var andindentifier = 0;
var orindentifier = 0;
var notindentifier = 0;
var xorindentifier = 0;

var showGates = false;
var showConnections = false;

function generateShapes() {
  const shapes = [];
  orindentifier = orindentifier + 1;
  shapes.push({
    id: orindentifier,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
  });

  return shapes;
}

function generateShapes2() {
  const shapes = [];
  andindentifier = andindentifier + 1;
  shapes.push({
    id: andindentifier,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
  });

  return shapes;
}

function showButtons_1() {
  if (showGates) {
    return (
      <div>
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
    );
  }
}

function showButtons_2() {
  if (showConnections) {
    return (
      <div>
        <SmallerButton type="button">Line</SmallerButton>
        <SmallerButton type="button">Bus</SmallerButton>
        <SmallerButton type="button">Point</SmallerButton>
      </div>
    );
  }
}

function generateShapes3() {
  const shapes = [];
  notindentifier = notindentifier + 1;
  shapes.push({
    id: notindentifier,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
  });

  return shapes;
}

function generateShapes4() {
  const shapes = [];
  xorindentifier = xorindentifier + 1;
  shapes.push({
    id: xorindentifier,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
  });
  return shapes;
}

function toggleGates(event) {
  showGates = !showGates;
}

function toggleConnections(event) {
  showConnections = !showConnections;
}

const INITIAL_SHAPES = generateShapes();
const INITIAL_SHAPES_TWO = generateShapes2();
const INITIAL_SHAPES_THREE = generateShapes3();
const INITIAL_SHAPES_FOUR = generateShapes4();
const RADIUS = 20;

const Line = ({ points }) => {
  return (
    <Shape
      points={points}
      sceneFunc={(context, shape) => {
        const width = points[1].x - points[0].x;
        const height = points[1].y - points[0].y;
        const dir = Math.sign(height);
        const radius = Math.min(
          RADIUS,
          Math.abs(height / 2),
          Math.abs(width / 2)
        );

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        context.lineTo(points[0].x + width / 2 - RADIUS, points[0].y);
        context.quadraticCurveTo(
          points[0].x + width / 2,
          points[0].y,
          points[0].x + width / 2,
          points[0].y + dir * radius
        );
        context.lineTo(points[0].x + width / 2, points[1].y - dir * radius);
        context.quadraticCurveTo(
          points[0].x + width / 2,
          points[1].y,
          points[0].x + width / 2 + radius,
          points[1].y
        );
        context.lineTo(points[1].x, points[1].y);
        context.fillStrokeShape(shape);
      }}
      stroke="black"
      strokeWidth={2}
    />
  );
};

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

var drawTheLine = false;

function updateDrawTheLine() {
  drawTheLine = !drawTheLine;
}

function getDrawTheLine() {
  return drawTheLine;
}

const SketchyBoardy = () => {
  const [isDrawing, setDrawing] = React.useState(false);
  const [lines, setLines] = React.useState([]);

  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);

  const [shapes4, setShapes4] = React.useState(INITIAL_SHAPES_FOUR);
  const [shapes3, setShapes3] = React.useState(INITIAL_SHAPES_THREE);
  const [shapes2, setShapes2] = React.useState(INITIAL_SHAPES_TWO);
  const [shapes, setShapes] = React.useState(INITIAL_SHAPES);
  const [connectors, setConnectors] = React.useState([]);

  const [fromShapeId, setFromShapeId] = React.useState(null);

  return (
    <div>
      <Container>
        <Sidebar>
          <Button onClick={toggleGates()}>Create Gate</Button>

          <Button type="button">Delete Gate</Button>
          <Button onClick={toggleConnections()}>Create Connection</Button>

          <Button type="button">View Truth Table</Button>
          <Button type="button">Add LED</Button>
          <Button type="button">View Boolean Expression</Button>
          <Input name="load" type="file"></Input>
          <Button type="button">Load file</Button>
          <Input name="saveas" type="text"></Input>
          <Button type="button">Save to PDF</Button>
        </Sidebar>
        <Stage
          width={"308px"}
          height={"703px"}
          onMouseDown={e => {
            if (drawTheLine == true) {
              const pos = e.target.getStage().getPointerPosition();
              const newLines = lines.concat([[pos, pos]]);
              setLines(newLines);
              setDrawing(true);
            }
          }}
          onMouseMove={e => {
            if (drawTheLine == true) {
              if (!isDrawing) {
                return;
              }
              const pos = e.target.getStage().getPointerPosition();
              const lastLine = lines[lines.length - 1].slice();
              lastLine[1] = pos;

              const newLines = lines.slice();
              newLines[newLines.length - 1] = lastLine;
              setLines(newLines);
            }
          }}
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
            ))}
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
            ))}
          </Layer>
        </Stage>
      </Container>
    </div>
  );
};

export default SketchyBoardy;
