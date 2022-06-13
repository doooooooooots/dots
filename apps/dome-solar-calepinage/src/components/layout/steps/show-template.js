import React from 'react';
import { observer } from 'mobx-react';
import Canvas from '../canvas/canvas';
import Cover from '../canvas/cover';
import { useStore } from '../../../context/useStore';

function StepTemplate() {
  const store = useStore();

  return (
    <Canvas
      isCentered
      markups={[
        {
          side: 'down',
          isInner: true,
          offset: {
            x: 0,
            y:
              2 * store.getUserDatas('My') +
              store.getUserDatas('Ey') +
              store.getUserDatas('Cx') / store.getUserDatas('CnbOfWaves') +
              2 * store.getConfig().pigeZ,
          },
          marks: [
            {
              id: 'PigeMX0',
              offset:
                (1.5 * store.getUserDatas('Cx')) /
                  store.getUserDatas('CnbOfWaves') +
                store.getUserDatas('PigeX0'),
            },
            {
              id: 'PigeX0',
              offset:
                (1.5 * store.getUserDatas('Cx')) /
                store.getUserDatas('CnbOfWaves'),
            },
            {
              id: 'PigeMX1',
              offset:
                (1.5 * store.getUserDatas('Cx')) /
                  store.getUserDatas('CnbOfWaves') +
                store.getUserDatas('Mx') -
                store.getUserDatas('PigeX1') -
                store.getUserDatas('PigeMX1'),
            },
            {
              id: 'PigeX1',
              offset:
                (1.5 * store.getUserDatas('Cx')) /
                  store.getUserDatas('CnbOfWaves') +
                store.getUserDatas('Mx') -
                store.getUserDatas('PigeX1'),
            },
          ],
        },
        {
          isInner: true,
          offset: {
            x:
              (1.5 * store.getUserDatas('Cx')) /
              store.getUserDatas('CnbOfWaves'),
            y: store.getUserDatas('Cx') / store.getUserDatas('CnbOfWaves'),
          },
          marks: [
            {
              id: 'Ey',
              offset: 'My',
            },
            {
              id: 'Ex',
              offset: 'Mx',
              side: 'up',
            },
          ],
        },
      ]}
    >
      <Cover store={store} withTemplate />
    </Canvas>
  );
}

export default observer(StepTemplate);
