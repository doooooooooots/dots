import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { Alert, Stack, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import ConfirmModal from '../confirm-modal';

const DefaultDialogDeleteMany = (props: any) => {
  const { target, onSubmit, onClose, ...other } = props;

  const ids = useMemo(() => target.map((id: string) => ({ id })), [target]);

  // *FUNC -- OnSubmit
  const handleSubmitClick = useCallback(async () => {
    await onSubmit({ variables: { where: ids } });
    onClose();
  }, [onSubmit, onClose, ids]);

  return (
    <ConfirmModal
      {...other}
      variant={GRAPHQL_ACTIONS.DeleteMany}
      onSubmit={handleSubmitClick}
    >
      <Stack spacing={2}>
        <Typography variant="h6">
          Etes-vous certain de vouloir supprimer les élément suivants ?
        </Typography>
        <Alert severity="error">
          <code>
            <pre>{JSON.stringify(ids, null, 2)}</pre>
          </code>
        </Alert>
      </Stack>
    </ConfirmModal>
  );
};

export default DefaultDialogDeleteMany;
