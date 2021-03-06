import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/useStore';
import Canvas from '../canvas/canvas';
import Cover from '../canvas/cover';

function StepUseCladding() {
  const store = useStore();

  return (
    <Canvas>
      <Cover store={store} />
    </Canvas>
  );
}

StepUseCladding.propTypes = {
  onChangeCallback: PropTypes.any,
};

export default observer(StepUseCladding);
