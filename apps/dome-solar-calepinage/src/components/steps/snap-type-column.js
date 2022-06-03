import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Group } from 'react-konva';
import { ceil } from 'lodash';
import Module from '../module';
import { useStore } from '../context/useStore';
import Canvas from '../canvas/canvas';

function StepMarkup() {
  const store = useStore();

  const [snapped, setSnapped] = useState(false);
  const isRendered = store.isRendered();

  const marks = new Array(store.getMaxRow() + 1).fill(0).map((value, index) => {
    const offset =
      0 +
      (index >= 1) *
        (store.config.railBottomOffset +
          store.getUserDatas('My') -
          store.getRailMiddleOffset()) +
      (index > 1) *
        (store.getUserDatas('Ey') + store.getUserDatas('My')) *
        (index - 1);

    return {
      offset,
      label: offset,
    };
  });

  const markups = [
    {
      variant: 'marks',
      isInner: true,
      marks,
      height: 8,
      size: store.railPosX() + 250,
      offset: {
        x: store.getUserDatas('Mx') - store.railPosX(),
        y:
          store.generatorY() +
          store.getRailTop() +
          store.config.railBottomOffset,
      },
    },
    {
      isInner: true,
      offset: {
        y: 0,
        x: store.railPosX(),
      },
      size: 30,
      marks: [
        {
          label: ` Rail à rail : ${ceil(
            store.generatorY() +
              store.getRailTop() +
              store.config.railBottomOffset
          )} `,
          size:
            store.generatorY() +
            store.getRailTop() +
            store.config.railBottomOffset,
        },
      ],
    },
  ];

  useEffect(() => {
    const handleAsync = async () => {
      await store.countToSnap({
        id: 'markup',
        name: 'Colonne type',
      });
      store.setIsLoading(false);
      store.setCurrentPage('preview');
    };
    if (!snapped && isRendered) {
      handleAsync();
      setSnapped(true);
    }
  }, [isRendered, snapped, store]);

  if (store.getCurrentMaxRow() === 0) return null;

  return (
    <Canvas markups={markups} isCentred>
      <Group id="modules">
        {[...Array(store.getCurrentMaxRow())].map((module, index) => (
          <Module
            key={index.toString()}
            col={0}
            row={index}
            store={store}
            isEndBlock={index === store.getMaxRow() - 1}
            isActive
            visible
          />
        ))}
      </Group>
    </Canvas>
  );
}

export default observer(StepMarkup);
