import { gql, useMutation } from '@apollo/client';
import React from 'react';
import ConfirmMove from 'src/design-system/modals/confirm-modal-move-multiple';

const PUBLISH_MULTIPLE_STOCK_UNITS = gql`
  mutation MoveMultipleStockUnits($data: [StockUnitUpdateArgs!]!) {
    updateStockUnits(where: $where) {
      id
    }
  }
`;

function ModalPublishMultiple(props) {
  const { target, onClose, onSubmitCallback } = props;

  // *MUTATION
  const [publishMultipleStockUnit] = useMutation(PUBLISH_MULTIPLE_STOCK_UNITS);

  // *FUNC -- OnSubmit
  const handleSubmitClick = async () => {
    await publishMultipleStockUnit({ variables: { where: { id: target } } });
  };

  return (
    <ConfirmMove target={target} onCancel={onClose} onSubmit={handleSubmitClick} onSubmitCallback={onSubmitCallback} />
  );
}

export default ModalPublishMultiple;
