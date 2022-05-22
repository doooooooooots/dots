import React from 'react';
import { observer } from 'mobx-react';
import { Rect } from 'react-konva';

export const Rail = observer((props) => {
  const { store } = props;

  return (
    <Rect
      x={0}
      y={0}
      width={store.getUserDatas('RailX')}
      height={store.getUserDatas('RailY')}
      fill="red"
      strokeScaleEnabled={false}
    />
  );
});
