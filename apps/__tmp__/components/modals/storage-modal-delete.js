import React from 'react';
import { gql, useMutation } from '@apollo/client';
import ConfirmDeleteOne from 'src/design-system/modals/confirm-modal-delete-one';

const DELETE_ONE_STOCK_UNITS = gql`
  mutation DeleteMultipleStockUnits($where: StockUnitWhereUniqueInput!) {
    deleteStockUnit(where: $where) {
      id
    }
  }
`;

function ModalDeleteOne(props) {
  const { target, onClose, onSubmitCallback } = props;

  // *MUTATION
  const [deleteOneStockUnit] = useMutation(DELETE_ONE_STOCK_UNITS);

  // *FUNC -- OnSubmit
  const handleSubmitClick = async () => {
    await deleteOneStockUnit({ variables: { where: { id: target } } });
    onClose();
  };

  return (
    <ConfirmDeleteOne
      target={target}
      onCancel={onClose}
      onSubmit={handleSubmitClick}
      onSubmitCallback={onSubmitCallback}
    />
  );
}

export default ModalDeleteOne;
