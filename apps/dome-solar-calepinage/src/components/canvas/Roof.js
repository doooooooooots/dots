import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Group, Arrow } from 'react-konva';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';
import Module from '../Module';
import Contour from './Contour';
import Obsctacle from '../Obsctacle';

const Roof = (props) => {
  const {
    store
  } = props;

  const [isMounted, setIsMounted] = useState(false);

  const currentMaxCol = store.getCurrentMaxCol();
  const currentMaxRow = store.getCurrentMaxRow();
  const offsetX = store.offsetX();
  const offsetY = store.offsetY();
  /**
   * Manage Modules
   * ----
   */

  useEffect(() => {
    setIsMounted(true);
    return () => { setIsMounted(false); };
  }, []);

  /**
   * Click Events
   * ----
   */
  if (!store.allModules()) return null;

  return (
    <>
      <Contour
        // Roof contour
        width={store.getUserDatas('Tx')}
        height={store.getUserDatas('Ty')}
        stroke="#000"
        strokeWidth={3}
      />

      <Group>
        {
          // Obstacles
          store.allObstacles().length > 0
          && store.allObstacles().map((obstacle) => (
            <Obsctacle
              key={obstacle.id}
              obstacle={obstacle}
            />
          ))
        }
      </Group>

      <Group
        // Modules
        x={offsetX}
        y={offsetY}
      >
        {store.allModules()
          && store.allModules().map((element) => {
            const { index, isIntercepted } = element;
            return (
              <Module
                key={`mod_${index + 2}`}
                index={index}
                store={store}
                col={store.getCol(index)}
                row={store.getRow(index)}
                isActive={store.isActive(index)}
                isFocused={store.isFocused(index)}
                isSelected={store.isSelected(index)}
                isStartBlock={store.isStartBlock(index)}
                isEndBlock={store.isEndBlock(index)}
                isIntercepted={isIntercepted.length}
                visible
              />
            );}
          )}
      </Group>

      {/* Arrow */}
      <Group
        opacity={0.15}
      >
        <Arrow
          points={[
            store.getUserDatas('Tx') / 2,
            0,
            store.getUserDatas('Tx') / 2,
            store.getUserDatas('Ty') / 2.5
          ]}
          pointerLength={300}
          pointerWidth={400}
          stroke="#666"
          strokeWidth={Math.max(store.getUserDatas('Tx') * 0.04, 700)}
          fill="#666"
          fillAfterStrokeEnabled
          hitStrokeWidth={0}
        />
      </Group>
    </>
  );
};

Roof.propTypes = {
  store: PropTypes.any
};

export default observer(Roof);
