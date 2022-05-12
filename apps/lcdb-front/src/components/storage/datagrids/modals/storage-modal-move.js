import { useMutation } from '@apollo/client';
// import StorageChoiceAutocomplete from '@components/autocomplete-storage';
import { Alert, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import React, { useCallback, useState } from 'react';

function StorageMoveManyModal(props) {
  const { request, targets, onClose, Component, ...other } = props;

  // *MUTATION
  const [moveOneStockUnit] = useMutation(request);

  const [targetBox, setTargetBox] = useState({});

  // *FUNC -- OnSubmit
  const handleSubmitClick = useCallback(() => {
    if (!isEmpty(targetBox) && targetBox.id)
      moveOneStockUnit({
        variables: {
          ids: targets,
          storageID: targetBox.id,
        },
      });
    console.log(targets);
    onClose();
  }, [moveOneStockUnit, onClose, targetBox, targets]);

  return (
    <Component {...other} onCancel={onClose} onSubmit={handleSubmitClick}>
      {/* STORAGEBOX */}
      <Typography variant="body1" fontWeight="bold">
        Choisis le rack vers lequel déplacer les cartes :
      </Typography>
      {/* <StorageChoiceAutocomplete onChange={setTargetBox} /> */}
      <Alert severity="error">Pas encore tout à fait au point</Alert>
    </Component>
  );
}

export default StorageMoveManyModal;
