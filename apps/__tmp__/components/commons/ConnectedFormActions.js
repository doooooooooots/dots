import { Button, Stack } from '@mui/material';
import { isFunction } from 'lodash';
import React, { useCallback } from 'react';
import useConnectedForm from '@hooks/use-connected-form';
import useConnectedStepper from '@hooks/use-connected-stepper';

export default function ConnectedFormActions(props) {
  const { onSubmit, onCancel } = props;
  const { form } = useConnectedForm();
  const { isFirstStep, isLastStep, restart, onNextStep, onPreviousStep } = useConnectedStepper();

  const handleCancelClick = useCallback(() => {
    isFunction(onCancel) && onCancel();
    restart();
  }, [onCancel, restart]);

  const handleSubmitClick = useCallback(() => {
    isFunction(onSubmit) && onSubmit(form);
    restart();
  }, [form, onSubmit, restart]);

  return (
    <Stack direction='row'>
      {isFirstStep() ? (
        <Button onClick={handleCancelClick}>Annuler</Button>
      ) : (
        <Button onClick={onPreviousStep}>Précédent</Button>
      )}
      {isLastStep() ? (
        <Button onClick={handleSubmitClick}>Enregistrer</Button>
      ) : (
        <Button onClick={onNextStep}>Suivant</Button>
      )}
    </Stack>
  );
}
