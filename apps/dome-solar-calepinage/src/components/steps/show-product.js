import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { Fields } from '../../../components/entity/molecules/form';
import ActionRow from '../../../components/layouts/form/ActionRow';
import { DrawerContentSource } from '../../../components/teleporters/DrawerContent';
import { useStore } from '../context/useStore';
import Canvas from '../canvas/canvas';
import Module from '../module';
import StepDrawerContainer from './_trash/StepDrawerContainer';
import * as actionsBdd from '../../../libraries/actions';
import { useSelector } from '../../store/store';

const drawModulePos = [
  {
    pos: [0, 0],
    attrs: { isStartBlock: true },
  },
  {
    pos: [0, 1],
    attrs: { isEndBlock: true },
  },
];

function StepHasProduct(props) {
  const { onChangeCallback } = props;

  const store = useStore();

  const { actionsHistory } = useSelector((state) => state.form);

  const handleNext = () => {
    store.next();
  };

  return (
    <>
      <DrawerContentSource>
        <StepDrawerContainer onNext={handleNext}>
          <ActionRow
            property={actionsBdd[store.form.currentStep]}
            variant="embed"
            values={store.currentDefaultAction}
            onChange={onChangeCallback}
          />

          {isEmpty(actionsHistory) && !isEmpty(store.currentDefaultTarget) && (
            <Fields
              typeOf="product"
              values={store.currentDefaultTarget}
              defaultFields={['name']}
              variant="details"
              mode="view"
            />
          )}
        </StepDrawerContainer>
      </DrawerContentSource>

      <Canvas
        markups={[
          {
            isInner: true,
            offset: {
              x: store.config.railOffset - store.getUserDatas('Px') / 2,
            },
            marks: [
              { id: 'Py' },
              // {
              //   id: 'Px',
              //   side: 'up'
              // }
            ],
          },
        ]}
      >
        {drawModulePos.map((module) => (
          <Module
            key={`${module.pos[0]}-${module.pos[1]}`}
            col={module.pos[0]}
            row={module.pos[1]}
            store={store}
            isActive
            {...module.attrs}
          />
        ))}
      </Canvas>
    </>
  );
}

StepHasProduct.propTypes = {
  onChangeCallback: PropTypes.any,
};

export default observer(StepHasProduct);
