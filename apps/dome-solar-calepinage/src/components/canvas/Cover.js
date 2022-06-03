import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Group, Rect, Line } from 'react-konva';
import { observer } from 'mobx-react';
import Contour from './contour';
import Module from '../module';
// import ModuleMarkup from './ModuleMarkup';

const drawModulePos = [
  {
    pos: [0, 0],
    attrs: { isStartBlock: true },
  },
  {
    pos: [0, 1],
    attrs: { isEndBlock: true },
  },
  {
    pos: [1, 0],
    attrs: { isStartBlock: true },
  },
  {
    pos: [1, 1],
    attrs: { isEndBlock: true },
  },
];

const Cover = (props) => {
  const { store, withTemplate } = props;

  const [lines, setLines] = useState([]);

  const bacProfile =
    (store.getUserDatas('Cx') > 100 ? store.getUserDatas('Cx') : 100) /
    (store.getUserDatas('CnbOfWaves') > 1
      ? store.getUserDatas('CnbOfWaves')
      : 1);

  const gridLength =
    2 * store.getUserDatas('Mx') + store.getUserDatas('Ex') + 3 * bacProfile;
  const gridHeight =
    2 * store.getUserDatas('My') +
    store.getUserDatas('Ey') +
    2 * bacProfile +
    (withTemplate ? 2 * store.config.pigeZ : 0);

  const modulesRectX = 2 * store.getUserDatas('Mx') + store.getUserDatas('Ex');
  const modulesRectY = 2 * store.getUserDatas('My') + store.getUserDatas('Ey');

  const offsetX = (gridLength - modulesRectX) / 2;
  const offsetY =
    (gridHeight -
      (modulesRectY + (withTemplate ? 2 * store.config.pigeZ : 0))) /
    2;

  const isCoverCenter = store.getUserDatas('isCoverCenter');

  /**
   * Create Lines
   * ------------
   */
  useEffect(() => {
    setLines(() => {
      const currentLines = [];
      for (let index = 0; index <= gridLength / bacProfile + 1; index++) {
        let x = 0;
        if (isCoverCenter) {
          x =
            (gridLength - 2) / 2 +
            (-1) ** (index + 1) * Math.ceil(index / 2) * bacProfile;
        } else {
          x =
            (1 / 2) * bacProfile +
            (gridLength - 2) / 2 +
            (-1) ** (index + 1) * Math.ceil(index / 2) * bacProfile;
        }
        if (x > 0 && x < gridLength) {
          currentLines.push(
            <Line
              key={index}
              stroke="#00f"
              strokeWidth={1}
              strokeScaleEnabled={false}
              points={[x, 0, x, gridHeight]}
            />
          );
        }
      }
      return currentLines;
    });
  }, [gridLength, bacProfile, isCoverCenter, gridHeight]);

  return (
    <Group clipX={0} clipY={0} clipWidth={gridLength} clipHeight={gridHeight}>
      <Contour
        id="frame"
        width={gridLength}
        height={gridHeight}
        stroke="#00f"
      />
      {lines}
      <Group x={offsetX} y={offsetY}>
        <Group id="modules">
          {drawModulePos.map((module) => (
            <Module
              key={`${module.pos[0]}-${module.pos[1]}`}
              col={module.pos[0]}
              row={module.pos[1]}
              store={store}
              noRails
              isActive
              visible
              {...module.attrs}
            />
          ))}
        </Group>

        {!!withTemplate && (
          <Group id="pige" y={modulesRectY + store.config.pigeZ}>
            <Rect
              x={0}
              y={0}
              fill="#000"
              width={store.getUserDatas('Mx')}
              height={store.config.pigeZ}
            />
            <Rect
              x={store.getUserDatas('PigeX0')}
              y={0}
              fill="red"
              width={store.getUserDatas('PigeMX0')}
              height={store.config.pigeZ}
            />
            <Rect
              x={
                store.getUserDatas('Mx') -
                store.getUserDatas('PigeX1') -
                store.getUserDatas('PigeMX1')
              }
              y={0}
              fill="red"
              width={store.getUserDatas('PigeMX1')}
              height={store.config.pigeZ}
            />
          </Group>
        )}
      </Group>
    </Group>
  );
};

Cover.propTypes = {
  store: PropTypes.any,
  withTemplate: PropTypes.any,
};

export default observer(Cover);
