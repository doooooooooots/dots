import { gql, useMutation } from '@apollo/client';
import StorageChoiceAutocomplete from '@components/autocomplete-storage';
import { Alert, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import ConfirmMove from 'src/design-system/modals/confirm-modal-move-multiple';

const MOVE_ONE_STOCK_UNITS = gql`
  mutation moveOneStockUnits($stockUnitID: ID!, $storageID: ID!) {
    updateStockUnit(where: { id: $stockUnitID }, data: { storage: { connect: { id: $storageID } } }) {
      id
    }
  }
`;

function ModalMoveOne(props) {
  const { target, onClose, onSubmitCallback } = props;

  // *MUTATION
  const [moveOneStockUnit] = useMutation(MOVE_ONE_STOCK_UNITS);

  const [targetBox, setTargetBox] = useState({});

  const handleChange = (newValue) => {
    setTargetBox(newValue);
  };

  // *FUNC -- OnSubmit
  const handleSubmitClick = () => {
    if (!isEmpty(targetBox) && targetBox.id)
      moveOneStockUnit({
        variables: {
          stockUnitID: target,
          storageID: targetBox.id
        }
      });
  };

  return (
    <ConfirmMove target={target} onCancel={onClose} onSubmit={handleSubmitClick} onSubmitCallback={onSubmitCallback}>
      {/* STORAGEBOX */}
      <Typography variant='body1' fontWeight='bold'>
        Choisis le rack vers lequel déplacer les cartes :
      </Typography>
      <StorageChoiceAutocomplete onChange={handleChange} />
      <Alert severity='error'>Pas encore tout à fait au point</Alert>
    </ConfirmMove>
  );
}

export default ModalMoveOne;
