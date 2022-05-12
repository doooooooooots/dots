import { gql, useMutation } from '@apollo/client';
import React from 'react';
import ConfirmDeleteMultiple from 'src/design-system/modals/confirm-modal-delete-multiple';

const DELETE_MULTIPLE_STOCK_UNITS = gql`
  mutation DeleteMultipleStockUnits($where: [StockUnitWhereUniqueInput!]!) {
    deleteStockUnits(where: $where) {
      id
    }
  }
`;

function ModalDeleteMultiple(props) {
  const { target, onClose, onSubmitCallback } = props;

  // *MUTATION
  const [deleteMultipleStockUnits] = useMutation(DELETE_MULTIPLE_STOCK_UNITS);

  // *FUNC -- OnSubmit
  const handleSubmitClick = async () => {
    const where = target.map((id) => ({ id }));
    await deleteMultipleStockUnits({ variables: { where } });
    onClose();
  };

  return (
    <ConfirmDeleteMultiple
      target={target}
      onCancel={onClose}
      onSubmit={handleSubmitClick}
      onSubmitCallback={onSubmitCallback}
    />
  );
}

export default ModalDeleteMultiple;
