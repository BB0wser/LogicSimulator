import React from "react";
import { Shape } from "react-konva";

const Line = props => {
  const RADIUS = 20;
  return (
    <Shape
      points={props.points}
      sceneFunc={(context, shape) => {
        const width = props.points[1].x - props.points[0].x;
        const height = props.points[1].y - props.points[0].y;
        const dir = Math.sign(height);
        const radius = Math.min(
          RADIUS,
          Math.abs(height / 2),
          Math.abs(width / 2)
        );

        context.beginPath();
        context.moveTo(props.points[0].x, props.points[0].y);
        context.lineTo(
          props.points[0].x + width / 2 - RADIUS,
          props.points[0].y
        );
        context.quadraticCurveTo(
          props.points[0].x + width / 2,
          props.points[0].y,
          props.points[0].x + width / 2,
          props.points[0].y + dir * radius
        );
        context.lineTo(
          props.points[0].x + width / 2,
          props.points[1].y - dir * radius
        );
        context.quadraticCurveTo(
          props.points[0].x + width / 2,
          props.points[1].y,
          props.points[0].x + width / 2 + radius,
          props.points[1].y
        );
        context.lineTo(props.points[1].x, props.points[1].y);
        context.fillStrokeShape(shape);
      }}
      stroke="black"
      strokeWidth={2}
    />
  );
};

export default Line;
