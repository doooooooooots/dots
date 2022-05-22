import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Group } from 'react-konva';
import { ceil } from 'lodash';
import Module from '../Module';
import { DrawerContentSource } from '../../../components/teleporters/DrawerContent';
import { useStore } from '../context/useStore';
import Canvas from '../canvas/Canvas';

function StepMarkup() {
  const store = useStore();

  const marks = new Array(store.currentMaxRow + 1).fill(0).map((value, index) => {
    const offset =
      0 +
      (index >= 1) * (store.config.railBottomOffset + store.getUserDatas('My') - store.railMiddleOffset) +
      (index > 1) * (store.getUserDatas('Ey') + store.getUserDatas('My')) * (index - 1);

    return {
      offset,
      label: offset
    };
  });

  useEffect(() => {
    const handleAsync = async () => {
      await store.countToSnap({
        id: 'markup',
        name: 'Colonne type'
      });
      store.next();
    };
    handleAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DrawerContentSource />

      <Canvas
        markups={[
          {
            variant: 'marks',
            isInner: true,
            marks,
            height: 8,
            size: store.railPosX + 250,
            offset: {
              x: store.getUserDatas('Mx') - store.railPosX,
              y: store.generatorY + store.railTop + store.config.railBottomOffset
            }
          },
          {
            isInner: true,
            offset: {
              y: 0,
              x: store.railPosX
            },
            size: 30,
            marks: [
              {
                label: ` Rail à rail : ${ceil(store.generatorY + store.railTop + store.config.railBottomOffset)} `,
                size: store.generatorY + store.railTop + store.config.railBottomOffset
              }
            ]
          }
        ]}
      >
        <Group id='modules'>
          {[...Array(store.currentMaxRow)].map((module, index) => (
            <Module
              key={index.toString()}
              col={0}
              row={index}
              store={store}
              isEndBlock={index === store.currentMaxRow - 1}
              isActive
            />
          ))}
        </Group>
      </Canvas>
    </>
  );
}

export default observer(StepMarkup);
