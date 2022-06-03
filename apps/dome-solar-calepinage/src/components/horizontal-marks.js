import React from 'react';
import PropTypes from 'prop-types';
import { Label, Line, Text, Tag, Group } from 'react-konva';
import { observer } from 'mobx-react';
import { ceil } from 'lodash';
import { HAS_OTHER_THAN_NUMBER } from '../utils/regex/other-than-number';

const MARK_OFFSET = 10;

function HorizontalMarks(props) {
  const { marks, markup, store, precision } = props;
  const side = markup.direction === 'up' ? 1 : -1;

  return (
    <>
      {marks.map((element, index) => {
        let outputLabel = element.label;
        if (outputLabel.toString().search(HAS_OTHER_THAN_NUMBER === -1)) {
          outputLabel = ceil(
            parseInt(outputLabel, 10),
            precision ?? 0
          ).toString();
        }

        return (
          <Group
            key={index.toString()}
            y={store.toPx(element.offset) * -1}
            fill="white"
          >
            <Line
              points={[0, 0, MARK_OFFSET + store.toPx(markup.size), 0]}
              stroke="#c1c1c1"
              strokeWidth={0.5}
            />
            <Label
              x={MARK_OFFSET + store.toPx(markup.size)}
              y={side * markup.height}
            >
              <Tag fill="white" stroke="white" />
              <Text
                width={50}
                text={outputLabel}
                align="left"
                verticalAlign="middle"
                padding={2}
              />
            </Label>
          </Group>
        );
      })}
    </>
  );
}

HorizontalMarks.propTypes = {
  marks: PropTypes.any,
  store: PropTypes.any,
  markup: PropTypes.any,
  precision: PropTypes.any,
  size: PropTypes.any,
};

export default observer(HorizontalMarks);
