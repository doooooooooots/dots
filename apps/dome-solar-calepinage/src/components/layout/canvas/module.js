import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Group, Line, Rect } from 'react-konva';

const Module = (props) => {
  const {
    id,
    col,
    row,
    store,
    isStartBlock,
    isEndBlock,
    isActive,
    isFocused,
    isSelected,
    noRails,
    visible,
    isIntercepted,
    ...attrs
  } = props;

  const Px = store.getUserDatas('Px');
  const Py = store.getUserDatas('Py');

  const showBottomRail = isEndBlock && isActive && !noRails;

  let color = '#fafafa';
  let opacity = 1;
  if (isSelected) color = '#b4eeff';
  if (isIntercepted) color = '#ffa4a4';
  if (!isActive) [color, opacity] = ['#fafafa', 0.2];
  if (!isActive && isSelected) [color, opacity] = ['#e5f2ff', 0.8];
  if (isActive && isIntercepted) opacity = 0.8;

  // During Rendering
  if (store.isLoading() && (isIntercepted)) [color, opacity] = ['#fafafa', 1];
  if (store.isLoading() && (!isActive)) opacity = 0;
  if (store.isLoading() && isFocused && store.getCurrentRows() !== []) [color, opacity] = ['#b4eeff', 1];

  return (
    <Group
      x={col * (store.getUserDatas('Mx') + store.getUserDatas('Ex'))}
      y={row * (store.getUserDatas('My') + store.getUserDatas('Ey'))}
      opacity={opacity}
      visible={!!visible}
      strokeWidth={0}
    >
      {/* Module */}
      <Group
        y={noRails ? 0 : store.getRailTop()}
      >
        <Rect
          id={id}
          x={0}
          y={0}
          width={store.getUserDatas('Mx')}
          height={store.getUserDatas('My')}
          strokeWidth={1}
          stroke={isSelected ? 'blue' : '#333'}
          hitStrokeWidth={0}
          strokeScaleEnabled={false}
          shadowForStrokeEnabled={false}
          fill={color}
          {...attrs}
        />
        <Line
          points={[1, 1, store.getUserDatas('Mx') - 1, store.getUserDatas('My') - 1]}
          stroke="#5d5"
          strokeWidth={store.getRenderZoneState().scale > 0.5 ? 2 : 1}
          hitStrokeWidth={0}
          strokeScaleEnabled={false}
          opacity={0.6}
          dash={[10, 10]}
          dashEnabled={!isActive}
        />
        <Line
          points={[1, store.getUserDatas('My') - 1, store.getUserDatas('Mx') - 1, 1]}
          stroke="#5d5"
          strokeWidth={store.getRenderZoneState().scale > 0.5 ? 2 : 1}
          hitStrokeWidth={0}
          strokeScaleEnabled={false}
          opacity={0.6}
          dash={[10, 10]}
          dashEnabled={!isActive}
        />
      </Group>

      {/* Top Rails */}
      { isActive && !noRails
        && (
          <>
            <Rect
              id={id}
              x={store.railPosX()}
              y={0}
              width={Px}
              height={Py}
              strokeWidth={0}
              hitStrokeWidth={0}
              strokeScaleEnabled={false}
              shadowForStrokeEnabled={false}
              fill={isStartBlock ? '#555' : '#555'}
            />
            <Rect
              id={id}
              x={store.getUserDatas('Mx') - store.railPosX() - Px}
              y={0}
              width={Px}
              height={Py}
              strokeWidth={0}
              hitStrokeWidth={0}
              strokeScaleEnabled={false}
              shadowForStrokeEnabled={false}
              fill={isStartBlock ? '#555' : '#555'}
            />
          </>
        )}

      {/* Bottom Rails */}
      { showBottomRail
        && (
        <>
          <Rect
            id={id}
            x={store.railPosX()}
            y={store.getRailTop() + store.getUserDatas('My') - (Py - store.config.railBottomOffset)}
            width={Px}
            height={Py}
            fill="#555"
          />
          <Rect
            id={id}
            x={store.getUserDatas('Mx') - store.railPosX() - Px}
            y={store.getRailTop() + store.getUserDatas('My') - (Py - store.config.railBottomOffset)}
            width={Px}
            height={Py}
            fill="#555"
          />
        </>
        )}
    </Group>
  );
};

Module.propTypes = {
  col: PropTypes.number,
  height: PropTypes.number,
  id: PropTypes.any,
  isActive: PropTypes.any,
  isSelected: PropTypes.any,
  isEndBlock: PropTypes.any,
  isIntercepted: PropTypes.any,
  isFocused: PropTypes.any,
  isStartBlock: PropTypes.any,
  noRails: PropTypes.any,
  opacity: PropTypes.any,
  Px: PropTypes.number,
  Py: PropTypes.number,
  row: PropTypes.any,
  store: PropTypes.any,
  visible: PropTypes.any,
  width: PropTypes.number,
  x: PropTypes.any,
  y: PropTypes.any
};

export default observer(Module);
