import { Rect } from '@react-pdf/renderer';
import React, { useRef } from 'react';
import { Group, Layer, Stage } from 'react-konva';
import { useStore } from './Context/useStore';
import Contour from './canvas/contour';
import Module from './module';

export default function Snaps() {
  const stageRef = useRef(null);
  const store = useStore();

  return (
    <Stage id="container" width={841.89} height={595.28} ref={stageRef}>
      <Layer scaleX={1} scaleY={1}>
        <Contour
          // Roof contour
          color="red"
          width={841.89}
          height={595}
        />
        <Group>
          {
            // Obstacles
            store.modulesState.obstacles.length > 0 &&
              store.modulesState.obstacles.map((obstacle) => (
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
          {store.modules &&
            store.modules.map((element) => (
              <Module
                index={element.index}
                key={`mod_${element.index + 2}`}
                col={store.getCol(element.index)}
                row={store.getRow(element.index)}
                store={store}
                isActive={element.isActive}
                isStartBlock={store.isStartBlock(element.index)}
                isEndBlock={store.isEndBlock(element.index)}
                isIntercepted={element.isIntercepted.length}
              />
            ))}
        </Group>
      </Layer>
    </Stage>
  );
}
