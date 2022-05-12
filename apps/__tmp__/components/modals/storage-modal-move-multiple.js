import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';
import ConfirmMoveMultiple from 'src/design-system/modals/confirm-modal-move-out';
import StorageChoiceAutocomplete from '@components/autocomplete-storage';
import { Box } from '@mui/system';

const MOVE_MULTIPLE_STOCK_UNITS = gql`
  mutation moveMultipleStockUnits($data: [StockUnitUpdateArgs!]!) {
    updateStockUnits(data: $data) {
      id
    }
  }
`;

/**
 ** COMPONENT
 * --
 * @param {*} props
 * @returns
 */

function ModalMoveOne(props) {
  const { target, onClose, onSubmitCallback } = props;

  //* MUTATION
  const [moveOneStockUnit] = useMutation(MOVE_MULTIPLE_STOCK_UNITS);

  //* STATE -- Used to stock storage target object
  const [targetStorage, setTargetStorage] = useState({});

  //* FUNC -- Retrieve storage ID
  const handleChange = (newValue) => {
    setTargetStorage(newValue);
  };

  //* FUNC -- OnSubmit
  const handleSubmitClick = async () => {
    if (!isEmpty(targetStorage) && targetStorage.id) {
      await moveOneStockUnit({
        variables: {
          data: target.map((id) => ({
            where: { id },
            data: { storage: { connect: { id: targetStorage.id } } }
          }))
        }
      });
      onClose();
    }
  };

  return (
    <ConfirmMoveMultiple
      target={target}
      onCancel={onClose}
      onSubmit={handleSubmitClick}
      onSubmitCallback={onSubmitCallback}
    >
      {/* STORAGEBOX */}
      <Stack spacing={2}>
        <Typography variant='body1' fontWeight='bold'>
          Choisis le rack vers lequel déplacer les cartes :
        </Typography>
        <Box>
          <StorageChoiceAutocomplete onChange={handleChange} />
        </Box>
      </Stack>
    </ConfirmMoveMultiple>
  );
}

export default ModalMoveOne;
