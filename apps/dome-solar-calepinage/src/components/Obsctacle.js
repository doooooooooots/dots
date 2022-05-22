import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

export default function Obsctacle(props) {
  const { obstacle } = props;
  return (
    <>
      <Rect
        x={obstacle.x}
        y={obstacle.y}
        width={obstacle.width}
        height={obstacle.height}
        fill="#333"
        opacity={0.3}
      />
      <Rect
        x={obstacle.x - 1000}
        y={obstacle.y - 1000}
        width={obstacle.width + 2000}
        height={obstacle.height + 2000}
        stroke="red"
        strokeWidth={3}
        dash={[80, 80]}
      />
    </>
  );
}

Obsctacle.propTypes = {
  obstacle: PropTypes.shape({
    height: PropTypes.any,
    id: PropTypes.any,
    width: PropTypes.any,
    x: PropTypes.any,
    y: PropTypes.any
  })
};
