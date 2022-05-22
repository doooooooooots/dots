import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';
import { isEmpty } from 'lodash';
import Module from '../Module';
import Contour from './Contour';

const RoofView = (props) => {
  const {
    store
  } = props;

  return (
    <>
      <Contour
        // Roof contour
        width={store.getUserDatas('Tx')}
        height={store.getUserDatas('Ty')}
      />
      <Group>
        {
          // Obstacles
          (!isEmpty(store.modulesState.obstacles)
            && Array.isArray(store.modulesState.obstacles))
          && store?.modulesState?.obstacles?.map((obstacle) => (
            <Rect
              key={obstacle.id}
              x={obstacle.x}
              y={obstacle.y}
              width={obstacle.width}
              height={obstacle.height}
              fill="red"
            />
          ))
        }
      </Group>
      <Group
        // Modules
        x={store.getUserDatas('X0')}
        y={store.getUserDatas('Y0')}
      >
        {store.modules && store.modules.map((element) => (
          <Module
            index={element.index}
            key={`mod_${element.index + 2}`}
            col={store.getCol(element.index)}
            row={store.getRow(element.index)}
            store={store}
            isActive={element.isActive}
            isStartBlock={store.isStartBlock(element.index)}
            isEndBlock={store.isEndBlock(element.index)}
            isIntercepted={element.isIntercepted?.length || 0}
          />
        ))}
      </Group>
    </>
  );
};

RoofView.propTypes = {
  store: PropTypes.any
};

export default RoofView;
