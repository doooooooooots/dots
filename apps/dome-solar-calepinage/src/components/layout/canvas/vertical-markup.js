import React from 'react';
import PropTypes from 'prop-types';
import { Label, Line, Text, Tag, Group } from 'react-konva';
import { ceil } from 'lodash';
import { HAS_OTHER_THAN_NUMBER } from '../../../utils/regex/other-than-number';

const endingOffset = 3;
const lineExtend = 10;

export function VerticalMarkup(props) {
  const {
    length = 1,
    label,
    side = 'left',
    size = 1,
    offset,
    level,
    fontSize = 12,
    precision,
  } = props;

  const sizeSized = (-1) ** (side === 'right') * -size * level;

  let outputLabel = label;
  if (outputLabel.toString().search(HAS_OTHER_THAN_NUMBER) === -1) {
    outputLabel = ceil(parseInt(outputLabel, 10), precision ?? 0).toString();
  }

  return (
    <Group y={offset || 0}>
      {/* Main */}
      <Line
        points={[sizeSized, 0, sizeSized, length]}
        stroke="#333333"
        fill="#333333"
        strokeWidth={1}
      />

      {/* Extremities */}
      <Line
        points={[
          sizeSized - endingOffset,
          -endingOffset,
          sizeSized + endingOffset,
          endingOffset,
        ]}
        stroke="#333333"
        fill="#333333"
        strokeWidth={1}
      />
      <Line
        points={[
          sizeSized - endingOffset,
          length - endingOffset,
          sizeSized + endingOffset,
          length + endingOffset,
        ]}
        stroke="#333333"
        fill="#333333"
        strokeWidth={1}
      />

      {/* Lines to map */}
      <Line
        points={[sizeSized + (-1) ** (side === 'left') * lineExtend, 0, 0, 0]}
        stroke="#c1c1c1"
        strokeWidth={0.5}
      />
      <Line
        points={[
          sizeSized + (-1) ** (side === 'left') * lineExtend,
          length,
          0,
          length,
        ]}
        stroke="#c1c1c1"
        strokeWidth={0.5}
      />
      <Label
        rotation={-90}
        x={sizeSized - 6}
        y={length / 2 + outputLabel.length * 3}
      >
        <Tag fill="white" stroke="white" />
        <Text
          text={outputLabel}
          align="center"
          fontSize={fontSize}
          verticalAlign="middle"
          padding={1}
        />
      </Label>
    </Group>
  );
}

VerticalMarkup.propTypes = {
  label: PropTypes.any,
  length: PropTypes.number,
  level: PropTypes.any,
  side: PropTypes.any,
  fontSize: PropTypes.any,
  offset: PropTypes.number,
  precision: PropTypes.number,
  size: PropTypes.any,
};
