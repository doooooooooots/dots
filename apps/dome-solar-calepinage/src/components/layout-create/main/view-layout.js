import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../contexts/useStore';
import Canvas from '../../layout/canvas/canvas';
import Roof from '../../layout/canvas/roof';
import Alignment from '../../dots-system/enums/alignment';

function StepLayout() {
  const store = useStore();
  const { getAnchorPoint, getUserDatas } = store;
  const anchorPoint = getAnchorPoint();

  return (
    <Canvas
      isCentred
      markups={[
        {
          isInner: true,
          level: 2,
          marks: [
            {
              id: 'Ty',
            },
            {
              id: 'Tx',
              side: 'up',
            },
          ],
        },
        {
          isInner: true,
          fontSize: 9,
          marks: [
            {
              ...(Alignment.isTop(anchorPoint) && {
                id: 'Y0',
              }),
              ...(Alignment.isMiddle(anchorPoint) && {
                size: store.offsetY(),
              }),
              ...(Alignment.isBottom(anchorPoint) && {
                id: 'Y0',
                offset: getUserDatas('Ty') - getUserDatas('Y0'),
              }),
            },
            {
              ...(Alignment.isLeft(anchorPoint) && {
                id: 'X0',
              }),
              ...(Alignment.isCenter(anchorPoint) && {
                size: store.offsetX(),
              }),
              ...(Alignment.isRight(anchorPoint) && {
                id: 'X0',
                offset: getUserDatas('Tx') - getUserDatas('X0'),
              }),
              side: 'up',
            },
          ],
        },
        {
          isInner: true,
          side: 'right',
          offset: {
            x: store.generatorX() + store.offsetX(),
            y: store.offsetY() + store.getRailTop(),
          },
          marks: [
            {
              size: store.generatorY(),
            },
            {
              level: 2,
              label: `${store.getCurrentMaxRow()} rangée${
                store.getCurrentMaxRow() > 1 ? 's' : ''
              }`,
              size: store.generatorY(),
            },
          ],
        },
        {
          isInner: true,
          offset: {
            x: store.offsetX(),
            y: store.offsetY() + store.generatorY() + store.getRailTop(),
          },
          marks: [
            {
              side: 'down',
              label: `Générateur: ${store.generatorX()}`,
              size: store.generatorX(),
            },
            {
              side: 'down',
              level: 2,
              label: `${store.getCurrentMaxCol()} colonne${
                store.getCurrentMaxCol() > 1 ? 's' : ''
              }`,
              size: store.generatorX(),
            },
          ],
        },
      ]}
    >
      <Roof store={store} />
    </Canvas>
  );
}

export default observer(StepLayout);
