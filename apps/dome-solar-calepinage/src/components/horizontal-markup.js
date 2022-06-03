import React from 'react';
import PropTypes from 'prop-types';
import { Label, Line, Text, Tag, Group } from 'react-konva';
import { ceil } from 'lodash';
import { HAS_OTHER_THAN_NUMBER } from '../utils/regex/other-than-number';

const endingOffset = 3;
const lineExtend = 10;

export function HorizontalMarkup(props) {
  const {
    length = 1,
    label,
    side = 'up',
    size = 1,
    offset,
    level,
    fontSize = 12,
    precision,
  } = props;

  const sizeSized = (-1) ** (side === 'down') * -size * level;

  let outputLabel = label;
  if (outputLabel.toString().search(HAS_OTHER_THAN_NUMBER) === -1) {
    outputLabel = ceil(parseInt(outputLabel, 10), precision ?? 0).toString();
  }

  return (
    <Group x={offset}>
      {/* Main */}
      <Line
        points={[0, sizeSized, length, sizeSized]}
        stroke="#333333"
        fill="#333333"
        strokeWidth={1}
      />

      {/* Extremities */}
      <Line
        points={[
          endingOffset,
          sizeSized - endingOffset,
          -endingOffset,
          sizeSized + endingOffset,
        ]}
        stroke="#333333"
        fill="#333333"
        strokeWidth={1}
      />
      <Line
        points={[
          length + endingOffset,
          sizeSized - endingOffset,
          length - endingOffset,
          sizeSized + endingOffset,
        ]}
        stroke="#333333"
        fill="#333333"
        strokeWidth={1}
      />
      <Line
        points={[0, sizeSized + (-1) ** (side === 'up') * lineExtend, 0, 0]}
        stroke="#c1c1c1"
        strokeWidth={0.5}
      />
      <Line
        points={[
          length,
          sizeSized + (-1) ** (side === 'up') * lineExtend,
          length,
          0,
        ]}
        stroke="#c1c1c1"
        strokeWidth={0.5}
      />
      <Label x={length / 2 - outputLabel.length * 3.6} y={sizeSized - 4}>
        <Tag fill="#ffffff" stroke="#ffffff" />
        <Text
          text={outputLabel}
          align="center"
          fontSize={fontSize}
          padding={1}
        />
      </Label>
    </Group>
  );
}

HorizontalMarkup.propTypes = {
  side: PropTypes.any,
  label: PropTypes.any,
  length: PropTypes.number,
  level: PropTypes.any,
  offset: PropTypes.any,
  fontSize: PropTypes.any,
  precision: PropTypes.any,
  size: PropTypes.any,
};
