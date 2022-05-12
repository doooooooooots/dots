import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

function DeleteOneModalLogic(props: any) {
  const { request, targets, onClose, Component, ...other } = props;

  // *MUTATION
  const [deleteOne] = useMutation(request);

  // *FUNC -- OnSubmit
  const handleSubmitClick = useCallback(async () => {
    await deleteOne({ variables: { where: { id: targets } } });
    onClose();
  }, [deleteOne, onClose, targets]);

  return (
    <Component {...other} onCancel={onClose} onSubmit={handleSubmitClick} />
  );
}

export default DeleteOneModalLogic;
