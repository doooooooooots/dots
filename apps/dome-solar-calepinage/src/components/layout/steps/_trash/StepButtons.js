import PropTypes from 'prop-types';
import React from 'react';
import { Button, Box } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SaveIcon from '@mui/icons-material/Save';

import { isEmpty } from 'lodash';
import { useStore } from '../../../../context/useStore';

export default function StepButtons(props) {
  const { onNext, disabled } = props;
  const store = useStore();

  return (
    <Box
      px={4}
      flexGrow={0}
      display="flex"
      justifyContent="space-between"
      pb={2}
      pt={2}
      borderTop={1}
      borderColor="divider"
    >
      {store.steps.indexOf(store.form.currentStep) !== 0 &&
      isEmpty(formsHistory) ? (
        <Button
          variant="outlined"
          onClick={() => store.previous()}
          startIcon={<NavigateBeforeIcon />}
        >
          Retour
        </Button>
      ) : (
        <Box />
      )}

      {(isEmpty(actionsHistory) ||
        store.form.currentStep === 'template' ||
        store.form.currentStep === 'markup' ||
        store.form.currentStep === 'layout') &&
        (store.steps.indexOf(store.form.currentStep) <
        store.steps.length - 4 ? (
          <Button
            variant="contained"
            onClick={onNext}
            disabled={
              !!disabled ||
              store.isLoading ||
              (isEmpty(store.currentDefaultTarget) &&
                !(
                  store.form.currentStep === 'template' ||
                  store.form.currentStep === 'markup' ||
                  store.form.currentStep === 'layout'
                ))
            }
            endIcon={<NavigateNextIcon />}
          >
            Suivant
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={onNext}
            startIcon={<SaveIcon />}
            disabled={store.isLoading}
          >
            Save and Générate Pdf
          </Button>
        ))}
    </Box>
  );
}

StepButtons.propTypes = {
  onNext: PropTypes.any,
  disabled: PropTypes.any,
};
