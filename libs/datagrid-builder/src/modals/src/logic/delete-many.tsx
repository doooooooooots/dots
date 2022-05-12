import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

function DeleteManyModalLogic(props: any) {
  const { request, targets, onClose, Component, ...other } = props;

  // *MUTATION
  const [deleteMany] = useMutation(request);

  // *FUNC -- OnSubmit
  const handleSubmitClick = useCallback(async () => {
    await deleteMany({ variables: { where: { id: targets } } });
    onClose();
  }, [deleteMany, onClose, targets]);

  return (
    <Component {...other} onCancel={onClose} onSubmit={handleSubmitClick} />
  );
}

export default DeleteManyModalLogic;
