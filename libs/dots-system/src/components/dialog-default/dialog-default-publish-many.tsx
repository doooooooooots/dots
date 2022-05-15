import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { Alert, Stack, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import ConfirmModal from '../confirm-modal';

const DefaultDialogPublishMany = (props: any) => {
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
      variant={GRAPHQL_ACTIONS.PublishMany}
      onSubmit={handleSubmitClick}
    >
      <Stack spacing={2}>
        <Typography variant="h6">
          Etes-vous certain de vouloir publier les éléments suivants ?
        </Typography>
        <Alert severity="success">
          <code>
            <pre>{JSON.stringify(ids, null, 2)}</pre>
          </code>
        </Alert>
      </Stack>
    </ConfirmModal>
  );
};

export default DefaultDialogPublishMany;
