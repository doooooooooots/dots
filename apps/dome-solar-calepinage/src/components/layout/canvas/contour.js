import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

const Contour = (props) => {
  const {
    width,
    height,
    stroke,
    strokeWidth
  } = props;

  const lineProps = {
    stroke: stroke || 'black',
    strokeWidth: strokeWidth || 1
  };

  return (
    <Rect
      {...lineProps}
      x={0}
      y={0}
      width={width}
      height={height}
      hitStrokeWidth={0}
      strokeScaleEnabled={false}
      shadowForStrokeEnabled={false}
    />
  );
};

Contour.propTypes = {
  stroke: PropTypes.any,
  strokeWidth: PropTypes.any,
  height: PropTypes.any,
  width: PropTypes.any
};

export default React.memo(Contour);
