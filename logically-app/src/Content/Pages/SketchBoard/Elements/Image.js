import React from "react";
import useImage from "use-image";
import { Image } from "react-konva";

const URLImage = props => {
  const [img] = useImage(props.image.src);
  return (
    <Image
      image={img}
      x={props.image.x}
      y={props.image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

export default URLImage;
