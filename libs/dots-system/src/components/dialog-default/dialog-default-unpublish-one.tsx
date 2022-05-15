import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { Alert, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import ConfirmModal from '../confirm-modal';

const DefaultDialogPublishOne = (props: any) => {
  const { target, onSubmit, onClose, ...other } = props;

  // *FUNC -- OnSubmit
  const handleSubmitClick = useCallback(async () => {
    await onSubmit({ variables: { where: '' } });
    onClose();
  }, [onSubmit, onClose]);

  return (
    <ConfirmModal
      {...other}
      variant={GRAPHQL_ACTIONS.UnpublishOne}
      onSubmit={handleSubmitClick}
    >
      <Stack spacing={2}>
        <Typography variant="h6">
          Etes-vous certain de vouloir publier l'élément suivant ?
        </Typography>
        <Alert severity="success">
          <code>
            <pre>{JSON.stringify(target, null, 2)}</pre>
          </code>
        </Alert>
      </Stack>
    </ConfirmModal>
  );
};

export default DefaultDialogPublishOne;
