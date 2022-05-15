import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { Alert, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import ConfirmModal from '../confirm-modal';

const DefaultDialogMoveMany = (props: any) => {
  const { target, onSubmit, onClose, ...other } = props;
  const { id } = target;

  // *FUNC -- OnSubmit
  const handleSubmitClick = useCallback(async () => {
    await onSubmit({ variables: { where: { id: id } } });
    onClose();
  }, [onSubmit, onClose, id]);

  return (
    <ConfirmModal
      {...other}
      variant={GRAPHQL_ACTIONS.MoveMany}
      onSubmit={handleSubmitClick}
      textAlign="left"
    >
      <Stack spacing={2}>
        <Typography variant="h6">
          Etes-vous certain de vouloir modifier l'élément suivant ?
        </Typography>
        <Alert severity="warning">
          <code>
            <pre>{JSON.stringify(target, null, 2)}</pre>
          </code>
        </Alert>
      </Stack>
    </ConfirmModal>
  );
};

export default DefaultDialogMoveMany;
