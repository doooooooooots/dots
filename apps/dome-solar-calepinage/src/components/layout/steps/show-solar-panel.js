import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { Fields } from '../../../components/entity/molecules/form';
import ActionRow from '../../../components/layouts/form/ActionRow';
import { DrawerContentSource } from '../../../components/teleporters/DrawerContent';
import { useStore } from '../../../contexts/useStore';
import Canvas from '../canvas/canvas';
import Form from '../../_trash/form';
import Module from '../../module';
import StepDrawerContainer from './_trash/StepDrawerContainer';
import moduleFields from '../../../config/module.json';
import * as actionsBdd from '../../../libraries/actions';
import { useDispatch, useSelector } from '../../store/store';
import { updateEntity } from '../../../slices/entity-slice';

const drawModulePos = [
  {
    pos: [0, 0],
    attrs: { isStartBlock: true },
  },
  {
    pos: [0, 1],
    attrs: { isEndBlock: true },
  },
  {
    pos: [1, 0],
    attrs: { isStartBlock: true },
  },
  {
    pos: [1, 1],
    attrs: { isEndBlock: true },
  },
];

function StepUseSolarPanel(props) {
  const { onChangeCallback } = props;
  const [checked, setChecked] = useState(false);

  const store = useStore();
  const dispatch = useDispatch();
  const { actionsHistory } = useSelector((state) => state.form);

  const handleNext = () =>
    dispatch(
      updateEntity({
        id: parseInt(store.form.currentLayout.id, 10),
        Ex: store.getUserDatas('Ex'),
        Ey: store.getUserDatas('Ey'),
      })
    ).then(store.next);

  return (
    <>
      <DrawerContentSource>
        <StepDrawerContainer onNext={handleNext} disabled={!checked}>
          <ActionRow
            property={actionsBdd[store.form.currentStep]}
            variant="embed"
            mode="edit"
            allowMultiple={false}
            values={store.currentDefaultAction}
            onChange={onChangeCallback}
          />

          {isEmpty(actionsHistory) && !isEmpty(store.currentDefaultTarget) && (
            <Fields
              typeOf="solarmodule"
              values={store.currentDefaultTarget}
              defaultFields={['name']}
              variant="details"
              mode="view"
            />
          )}

          {checked ? (
            <Alert severity="success" sx={{ mb: 1 }}>
              Parfait, merci 👍
            </Alert>
          ) : (
            <Alert severity="warning" sx={{ mb: 1 }}>
              Vérification obligatoire 👇
            </Alert>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                size="small"
              />
            }
            label="Je confirme ces dimensions"
          />

          {isEmpty(actionsHistory) && (
            <>
              <Typography variant="h5" textAlign="center" my={4}>
                Espacement entre les modules
              </Typography>
              <Form fields={moduleFields} />
            </>
          )}
        </StepDrawerContainer>
      </DrawerContentSource>

      <Canvas
        markups={[
          {
            isInner: true,
            marks: [
              {
                id: 'Mx',
                side: 'up',
              },
              {
                id: 'My',
                side: 'left',
              },
              {
                id: 'Ey',
                offset: 'My',
                level: 2,
              },
              {
                id: 'Ex',
                offset: 'Mx',
                side: 'up',
                level: 2,
              },
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
            noRails
            isActive
            {...module.attrs}
          />
        ))}
      </Canvas>
    </>
  );
}

StepUseSolarPanel.propTypes = {
  onChangeCallback: PropTypes.any,
};

export default observer(StepUseSolarPanel);
