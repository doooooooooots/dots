import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../context/useStore';
import Canvas from '../canvas/Canvas';
import Roof from '../canvas/Roof';

function StepLayout() {
  const store = useStore();

  return (
    <Canvas
      isCentred
      markups={[
        {
          isInner: true,
          level: 2,
          marks: [
            {
              id: 'Ty'
            },
            {
              id: 'Tx',
              side: 'up'
            }
          ]
        },
        {
          isInner: true,
          fontSize: 9,
          marks: [
            {
              ...(store.getAnchorPoint().includes('top') && {
                id: 'Y0'
              }),
              ...(store.getAnchorPoint().includes('middle') && {
                size: store.offsetY()
              }),
              ...(store.getAnchorPoint().includes('bottom') && {
                id: 'Y0',
                offset: store.getUserDatas('Ty') - store.getUserDatas('Y0')
              })
            },
            {
              ...(store.getAnchorPoint().includes('left') && {
                id: 'X0'
              }),
              ...(store.getAnchorPoint().includes('center') && {
                size: store.offsetX()
              }),
              ...(store.getAnchorPoint().includes('right') && {
                id: 'X0',
                offset: store.getUserDatas('Tx') - store.getUserDatas('X0')
              }),
              side: 'up'
            }
          ]
        },
        {
          isInner: true,
          side: 'right',
          offset: {
            x: store.generatorX() + store.offsetX(),
            y: store.offsetY() + store.getRailTop()
          },
          marks: [
            {
              size: store.generatorY()
            },
            {
              level: 2,
              label: `${store.getCurrentMaxRow()} rangée${store.getCurrentMaxRow() > 1 ? 's' : ''}`,
              size: store.generatorY()
            }
          ]
        },
        {
          isInner: true,
          offset: {
            x: store.offsetX(),
            y: store.offsetY() + store.generatorY() + store.getRailTop()
          },
          marks: [
            {
              side: 'down',
              label: `Générateur: ${store.generatorX()}`,
              size: store.generatorX()
            },
            {
              side: 'down',
              level: 2,
              label: `${store.getCurrentMaxCol()} colonne${store.getCurrentMaxCol() > 1 ? 's' : ''}`,
              size: store.generatorX()
            }
          ]
        }
      ]}
    >
      <Roof store={store} />
    </Canvas>
  );
}

export default observer(StepLayout);
