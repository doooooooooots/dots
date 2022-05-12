import { gql, useMutation } from '@apollo/client';
import React from 'react';
import ConfirmMove from 'src/design-system/modals/confirm-modal-move-multiple';

const UNLIST_MULTIPLE_STOCK_UNITS = gql`
  mutation MoveMultipleStockUnits($data: [StockUnitUpdateArgs!]!) {
    updateStockUnits(where: $where) {
      id
    }
  }
`;

function ModalUnlistMultiple(props) {
  const { target, onClose, onSubmitCallback } = props;

  // *MUTATION
  const [unlistMultipleStockUnit] = useMutation(UNLIST_MULTIPLE_STOCK_UNITS);

  // *FUNC -- OnSubmit
  const handleSubmitClick = async () => {
    await unlistMultipleStockUnit({ variables: { where: { id: target } } });
  };

  return (
    <ConfirmMove target={target} onCancel={onClose} onSubmit={handleSubmitClick} onSubmitCallback={onSubmitCallback} />
  );
}

export default ModalUnlistMultiple;
