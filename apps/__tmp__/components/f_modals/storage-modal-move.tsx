import { useMutation } from '@apollo/client';
// import StorageChoiceAutocomplete from '@components/autocomplete-storage';
import { Alert, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import React, { useCallback, useState } from 'react';
import { ConfirmModal } from '@dots.cool/dots-system';

function StorageMoveManyModal(props) {
  const { targets, onSubmit, onClose, ...other } = props;

  // *MUTATION
  const [targetBox, setTargetBox] = useState({});

  // *FUNC -- OnSubmit
  const handleSubmitClick = useCallback(() => {
    if (!isEmpty(targetBox) && targetBox.id)
      onSubmit({
        variables: {
          ids: targets,
          storageID: targetBox.id,
        },
      });
    onClose();
  }, [onSubmit, onClose, targetBox, targets]);

  return (
    <ConfirmModal {...other} onCancel={onClose} onSubmit={handleSubmitClick}>
      {/* STORAGEBOX */}
      <Typography variant="body1" fontWeight="bold">
        Choisis le rack vers lequel déplacer les cartes :
      </Typography>
      {/* <StorageChoiceAutocomplete onChange={setTargetBox} /> */}
      <Alert severity="error">Pas encore tout à fait au point</Alert>
    </ConfirmModal>
  );
}

export default StorageMoveManyModal;
