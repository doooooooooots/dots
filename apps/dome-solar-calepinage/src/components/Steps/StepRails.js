import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../context/useStore';
import Canvas from '../canvas/Canvas';
import Roof from '../canvas/Roof';

function StepRails() {
  const store = useStore();

  const marks =
    store.getCurrentRows().length === 0
      ? []
      : [
          {
            offset: 0,
            label: 0
          },
          ...store.getCurrentRows().map((row) => ({
            offset: (store.getUserDatas('Ey') + store.getUserDatas('My')) * (store.getCurrentMaxRow() - row - 1),
            label: (store.getUserDatas('Ey') + store.getUserDatas('My')) * (store.getCurrentMaxRow() - row - 1)
          }))
        ];

  return (
    <Canvas
      markups={[
        {
          variant: 'marks',
          isInner: true,
          marks,
          height: 12,
          size: store.spaceLeftX() + store.railPosX(),
          offset: {
            x: store.getUserDatas('Tx') - store.spaceLeftX() - store.railPosX(),
            y: store.getUserDatas('Ty') - store.spaceLeftY() + store.config.railBottomOffset
          }
        },
        ...(store.getCurrentRows().length === 0
          ? [
              {
                side: 'left',
                isInner: true,
                level: 1,
                offset: {
                  y: store.offsetY() + store.getRailTop(),
                  x: store.offsetX()
                },
                marks: [
                  {
                    label: `${store.getCurrentMaxRow()} rangée${store.getCurrentMaxRow() > 1 ? 's' : ''}`,
                    size: store.generatorY()
                  }
                ]
              },
              {
                isInner: true,
                offset: {
                  y: store.offsetY() + store.getRailTop(),
                  x: store.offsetX()
                },
                marks: [
                  {
                    side: 'up',
                    label: `${store.getCurrentMaxCol()} colonne${store.getCurrentMaxCol() > 1 ? 's' : ''}`,
                    size: store.generatorX()
                  }
                ]
              }
            ]
          : [])
      ]}
    >
      <Roof store={store} />
    </Canvas>
  );
}

export default observer(StepRails);
