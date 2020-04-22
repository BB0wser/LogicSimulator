import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Circle, Line, Text, Image } from "react-konva";
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
  height: 100%;
  bottom: 0;
  width: 250px;
  display: flex;
  flex-direction: column;

  background: #f0f8ff;
`;

function generateShapes() {
  const shapes = [];
  for (var i = 0; i < 10; i++) {
    shapes.push({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });
  }
  return shapes;
}

const INITIAL_SHAPES = generateShapes();

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


export const SketchBoard = () => {

  const dragUrl = React.useRef();
   const stageRef = React.useRef();
   const [images, setImages] = React.useState([]);

  const [shapes, setShapes] = React.useState(INITIAL_SHAPES);
  const [connectors, setConnectors] = React.useState([]);

  const [fromShapeId, setFromShapeId] = React.useState(null);

  return (
    <div>
    <Container>
        <Sidebar>
          <Button>Create Gate</Button>

              <SmallerButton type="button">
                AND
              </SmallerButton>
              <SmallerButton type="button" >
                OR
              </SmallerButton>
              <SmallerButton type="button">
                NOT
              </SmallerButton>
              <SmallerButton type="button" >
                EXCLUSIVE OR
              </SmallerButton>
          ) : null}
          <Button type="button" >
            Delete Gate
          </Button>
          <Button>Create Connection</Button>
              <SmallerButton type="button" >
                Line
              </SmallerButton>
              <SmallerButton type="button" >
                Bus
              </SmallerButton>
              <SmallerButton type="button" >
                Point
              </SmallerButton>
          ) : null}
          <Button type="button">View Truth Table</Button>
          <Button type="button">Add LED</Button>
          <Button type="button">View Boolean Expression</Button>
          <Button type="button">Save to PDF</Button>
          <Button >Testing json</Button>
        </Sidebar>
      </Container>
    <Stage
        width={window.innerWidth}
        height={window.innerHeight}

        >
      <Layer>
        {connectors.map(con => {
          const from = shapes.find(s => s.id === con.from);
          const to = shapes.find(s => s.id === con.to);
          {images.map(image => {
                        return <URLImage image={image} />;
                      })}
          return (
            <Line
              key={con.id}
              points={[from.x, from.y, to.x, to.y]}
              stroke="black"
            />
          );
        })}
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
      </Layer>
    </Stage>
  </div>
  );
};
