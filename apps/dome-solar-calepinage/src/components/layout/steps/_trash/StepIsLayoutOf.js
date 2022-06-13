import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { Typography, Container, Box, Button, Alert } from '@mui/material';
import { isEmpty } from 'lodash';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { observer } from 'mobx-react';
import { useDispatch } from 'react-redux';
import {
  createEntity,
  addAction,
  updateEntity,
} from '../../../slices/entity-slice';
import { useSelector } from '../../store/store';
import { useStore } from '../../../../context/useStore';
import Form from '../../form';
import ActionRow from '../../../components/layouts/form/ActionRow';
import { Fields } from '../../../components/entity/molecules/form';
import * as actionsBdd from '../../../libraries/actions';
import projectFields from '../../../config/project.json';
import useDrawer from '../../../hooks/useDrawer';

function StepIsLayoutOf(props) {
  const { onChangeCallback, mode } = props;

  const store = useStore();
  const { closeDrawer } = useDrawer();
  const dispatch = useDispatch();

  const { actionsHistory } = useSelector((state) => state.form);

  const handleCreateEntity = useCallback(
    () =>
      dispatch(
        createEntity({
          typeOf: 'layout',
          name: store.getUserDatas('name'),
        })
      )
        .then((res) => {
          store.setCurrentLayout(res);
          return dispatch(
            addAction({
              property: { guid: 'isLayoutOf' },
              agentId: parseInt(res.id, 10),
              targetId: parseInt(store.currentDefaultTarget.id, 10),
              isDefault: true,
            })
          );
        })
        .then((res) => {
          store.setCurrentAction(res.id);
        })
        .then(store.next),
    [dispatch, store]
  );

  const handleUpdateEntity = () => {
    if (store.getUserDatas('name') !== store.form.currentLayout.name) {
      dispatch(
        updateEntity({
          id: store.form.currentLayout.id,
          typeOf: 'layout',
          name: store.getUserDatas('name'),
        })
      );
    }
    store.next();
  };

  const handleNext = () => {
    if (isEmpty(store.form.currentLayout)) {
      handleCreateEntity();
    } else {
      handleUpdateEntity();
    }
  };

  useEffect(() => {
    closeDrawer();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100%',
        display: 'flex',
        pt: 10,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h1" textAlign="center">
        {mode === 'create' ? 'Créer un calepinage' : 'Modifier un calepinage'}
      </Typography>

      <Typography variant="body1" textAlign="center" mb={4}>
        Bienvenue dans l&apos;outil de création de calepinage.
      </Typography>

      {isEmpty(actionsHistory) && (
        <Form variant="embed" fields={projectFields} />
      )}
      <ActionRow
        property={actionsBdd[store.form.currentStep]}
        variant="embed"
        mode="edit"
        allowMultiple={false}
        values={store.currentDefaultAction}
        onChange={onChangeCallback}
      />

      {isEmpty(actionsHistory) && !isEmpty(store.currentDefaultTarget) && (
        <>
          <Alert severity="info">👇 Vérification &amp; validation</Alert>
          <Fields
            typeOf="project"
            values={store.currentDefaultTarget}
            defaultFields={['name']}
            mode="view"
            variant="details"
          />
        </>
      )}

      {isEmpty(actionsHistory) && (
        <Box textAlign="center" my={3}>
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
  );
}

StepIsLayoutOf.propTypes = {
  mode: PropTypes.string,
  onChangeCallback: PropTypes.any,
};

export default observer(StepIsLayoutOf);
