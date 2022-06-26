import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { debounce, isEmpty, last } from 'lodash';
import { observer } from 'mobx-react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDispatch, useSelector } from '../store/store';
import { resetForms } from '../../slices/form-slice';
import { getEntity, addAction, updateAction } from '../../slices/entity-slice';
import {
  AppBarLeftSource,
  AppBarRightSource,
} from '../../components/teleporters/AppBarTeleporter';
import { useStore } from '../../contexts/useStore';
import * as actionsBdd from '../../libraries/actions';
import BtnBack from '../../components/atoms/buttons/ButtonBack';
import StepPreview from './layout/steps/show-pdf';
import SmallChip from '../../components/atoms/chips/SmallChip';
import useDrawer from '../../hooks/useDrawer';
import StepIsLayoutOf from '../layout/steps/_trash/StepIsLayoutOf';
import StepUseSolarPanel from '../layout/steps/show-solar-panel';
import StepHasProduct from '../layout/steps/show-product';
import StepUseCladding from '../layout/steps/show-cladding';
import StepTemplate from '../layout/steps/show-template';
import StepLayout from '../layout-create/main/view-layout';
import StepHasTechnician from '../layout/steps/_trash/StepHasTechnician';
import StepRails from './layout/steps/snap-all-column-details';
import StepMarkup from './layout/steps/snap-type-column';
import ModeToggle from './mode-toggle';
import { QontoConnector, QontoStepIcon } from '../stepper';
import StepSummary from './StepSummary';

const correspondanceTable = {
  solarmodule: {
    lengthX: 'Mx',
    lengthY: 'My',
    lengthZ: 'Mh',
    electricalPower: 'MPw',
  },
  product: {
    lengthX: 'Px',
    lengthY: 'Py',
    lengthZ: 'Pz',
  },
  cladding: {
    numberOfWaves: 'CnbOfWaves',
    lengthX: 'Cx',
    lengthY: 'Cy',
    lengthZ: 'Cz',
  },
};

const App = ({ mode = 'create' }) => {
  const store = useStore();
  const dispatch = useDispatch();

  const { setAppDrawer, openDrawer } = useDrawer();
  const { formsById, formsHistory } = useSelector((state) => state.form);

  /**
   * Retrieve all informations from database
   * */
  const handleChangeCallback = (row) =>
    dispatch(getEntity(row.id)).then((res) => {
      // Keep mobx store up to date
      res.entityFields.forEach((field) => {
        if (!isEmpty(correspondanceTable[res.typeOf])) {
          store.setUserData(
            correspondanceTable[res.typeOf][field.name],
            field.value
          );
        }
      });

      // Save data to be send in db
      store.setCurrentDefaultTarget({
        target: res,
      });

      // If we know the id of current Layout, then save action (create or updates)
      if (!isEmpty(store.form.currentLayout?.id)) {
        if (!isEmpty(store.currentActionId)) {
          dispatch(
            updateAction({
              id: store.currentActionId,
              property: { guid: store.form.currentStep },
              agentId: parseInt(store.form.currentLayout.id, 10),
              targetId: parseInt(res.id, 10),
              isDefault: true,
            })
          );
        } else {
          dispatch(
            addAction({
              property: { guid: store.form.currentStep },
              agentId: parseInt(store.form.currentLayout.id, 10),
              targetId: parseInt(res.id, 10),
              isDefault: true,
            })
          ).then((action) => {
            store.setCurrentAction(action.id);
          });
        }
      }

      return {
        agent: {},
        target: row,
        property: actionsBdd[store.form.currentStep],
        isDefault: true,
      };
    });

  /**
   * KeyDown listener to make shortcuts
   * -----------------------
   */

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Shift' && store.keyboardState.isShiftDown === false) {
        store.updateKeyboard({ isShiftDown: true });
      }

      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        console.log('magax');
      }

      if (event.key === ' ' && store.keyboardState.isSpaceDown === false) {
        store.updateKeyboard({ isSpaceDown: true });
      }
    },
    [store]
  );

  /**
   * KeyUp listener to make shortcuts
   * -----------------------
   */

  const handleKeyUp = useCallback(
    (event) => {
      if (event.key === 'Shift') {
        store.updateKeyboard({ isShiftDown: false });
      }
      if (event.key === ' ') {
        store.updateKeyboard({ isSpaceDown: false });
      }
    },
    [store]
  );

  /**
   * Composant state
   * -----------------------
   */

  // TODO (Adrien) : Create hooks, use stores, clean logic
  useEffect(() => {
    if (!store.isReady) {
      store.init();
    }

    setAppDrawer({
      side: 'right',
      width: store.config.drawerWidth,
      open: false,
    });

    const debouncedHandleResize = debounce(() => {
      store.reloadSize();
    }, store.config.debounceTime);

    window.addEventListener('resize', debouncedHandleResize);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', debouncedHandleResize);
      store.setIsReady(false);
      dispatch(resetForms());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * OnChangeStep
   */

  useEffect(() => {
    if (
      [
        'useSolarPanel',
        'hasProduct',
        'useCladding',
        'template',
        'layout',
      ].includes(store.form.currentStep)
    )
      openDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.form.currentStep]);

  /**
   * Communicates data between redux dots app and mobx canvas app
   * -----------------------
   */

  useEffect(() => {
    const lastForm = formsById[last(formsHistory)];
    if (!isEmpty(lastForm)) {
      Object.keys(lastForm).forEach((key) => {
        if (!isEmpty(correspondanceTable[lastForm.typeOf])) {
          store.setUserData(
            correspondanceTable[lastForm.typeOf][key],
            parseInt(lastForm[key], 10)
          );
        }
      });
    }
    return () => {};
  }, [formsById, formsHistory, store]);

  if (!store.isReady) {
    return null;
  }

  return (
    <>
      <AppBarLeftSource>
        <BtnBack />
        <SmallChip
          label="Roof"
          color="primary"
          variant="contained"
          size="small"
        />
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          sx={{ mx: 'auto', maxWidth: 800 }}
        >
          <Stepper
            alternativeLabel
            activeStep={store.steps.indexOf(store.form.currentStep)}
            connector={<QontoConnector />}
          >
            {store.steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={QontoStepIcon}
                  StepIconProps={{ label }}
                  sx={{ width: 50 }}
                />
              </Step>
            ))}
          </Stepper>
        </Box>
      </AppBarLeftSource>

      <AppBarRightSource>
        {['layout', 'rails', 'markup'].includes(store.form.currentStep) && (
          <>
            <Box sx={{ '& > *': { mr: 2 } }}>
              <IconButton size="small" onClick={store.resetView}>
                <RestartAltIcon />
              </IconButton>
            </Box>
            <ModeToggle />
          </>
        )}
      </AppBarRightSource>

      {store.steps.indexOf(store.form.currentStep) === 0 && (
        <StepIsLayoutOf mode={mode} onChangeCallback={handleChangeCallback} />
      )}

      {store.form.currentStep === 'hasTechnician' && (
        <StepHasTechnician onChangeCallback={handleChangeCallback} />
      )}

      {store.form.currentStep === 'markup' && (
        <StepMarkup onChangeCallback={handleChangeCallback} />
      )}

      {store.form.currentStep === 'useSolarPanel' && (
        <StepUseSolarPanel onChangeCallback={handleChangeCallback} />
      )}

      {store.form.currentStep === 'hasProduct' && (
        <StepHasProduct onChangeCallback={handleChangeCallback} />
      )}

      {store.form.currentStep === 'useCladding' && (
        <StepUseCladding onChangeCallback={handleChangeCallback} />
      )}

      {store.form.currentStep === 'template' && (
        <StepTemplate onChangeCallback={handleChangeCallback} />
      )}

      {store.form.currentStep === 'layout' && (
        <StepLayout onChangeCallback={handleChangeCallback} />
      )}

      {store.form.currentStep === 'rails' && (
        <StepRails onChangeCallback={handleChangeCallback} />
      )}

      {store.form.currentStep === 'summary' && <StepSummary />}

      {store.form.currentStep === 'pdf' && <StepPreview />}

      <Dialog open={store.isLoading}>
        <DialogTitle>Générating snaps</DialogTitle>
      </Dialog>
    </>
  );
};

App.propTypes = {
  mode: PropTypes.string,
};

export default observer(App);
