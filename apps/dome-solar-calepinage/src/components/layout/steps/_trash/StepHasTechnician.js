import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Container, Box, Button, Alert } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import useDrawer from '../../../hooks/useDrawer';
import { Fields } from '../../../components/entity/molecules/form';
import ActionRow from '../../../components/layouts/form/ActionRow';
import { DrawerContentSource } from '../../../components/teleporters/DrawerContent';
import { useStore } from '../../../../context/useStore';
import StepDrawerContainer from './StepDrawerContainer';
import * as actionsBdd from '../../../libraries/actions';
import { useSelector } from '../../store/store';

function StepHasTechnician(props) {
  const { onChangeCallback } = props;
  const store = useStore();
  const { closeDrawer } = useDrawer();

  const { actionsHistory, formsHistory } = useSelector((state) => state.form);

  const handleNext = () => {
    store.next();
  };

  useEffect(() => {
    closeDrawer();
    return () => {};
  }, [closeDrawer]);

  return (
    <>
      <DrawerContentSource>
        <StepDrawerContainer onNext={handleNext}>
          {isEmpty(actionsHistory) && !isEmpty(store.currentDefaultTarget) && (
            <Fields
              typeOf="cladding"
              values={store.currentDefaultTarget}
              defaultFields={['name']}
              mode="view"
            />
          )}
        </StepDrawerContainer>
      </DrawerContentSource>

      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <ActionRow
          property={actionsBdd[store.form.currentStep]}
          variant="embed"
          allowMultiple={false}
          values={store.currentDefaultAction}
          onChange={onChangeCallback}
        />

        {isEmpty(actionsHistory) && !isEmpty(store.currentDefaultTarget) && (
          <>
            <Alert severity="info">👇 Vérification &amp; validation</Alert>
            <Fields
              typeOf="person"
              values={store.currentDefaultTarget}
              defaultFields={['name']}
              mode="view"
              variant="details"
            />
          </>
        )}

        {isEmpty(actionsHistory) && (
          <Box textAlign="center" my={3}>
            {store.steps.indexOf(store.form.currentStep) !== 0 &&
            isEmpty(formsHistory) ? (
              <Button
                variant="outlined"
                onClick={store.previous}
                startIcon={<NavigateBeforeIcon />}
                sx={{ mr: 1 }}
              >
                Retour
              </Button>
            ) : (
              <Box />
            )}

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isEmpty(store.currentDefaultTarget)}
              endIcon={<NavigateNextIcon />}
            >
              Suivant
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}

StepHasTechnician.propTypes = {
  onChangeCallback: PropTypes.any,
};

export default observer(StepHasTechnician);
