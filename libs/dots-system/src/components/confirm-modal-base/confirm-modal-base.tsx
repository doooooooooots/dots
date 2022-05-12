import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';

const ConfirmModal = (props: any) => {
  const {
    children,
    color = 'success',
    description,
    icon,
    cancelText = 'Annuler',
    onCancel,
    submitText = 'confirmer',
    onSubmit,
    onSubmitCallback,
    textAlign = 'center',
    title,
  } = props;

  const handleSubmit = async () => {
    const res = await onSubmit();
    if (typeof onSubmitCallback === 'function') {
      onSubmitCallback(res);
    }
  };

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      {/* DESCRIPTION */}
      {description && (
        <DialogContent sx={{ p: 2, textAlign: { textAlign } }}>
          {description}
        </DialogContent>
      )}
      {/* CONTENT - PREVIEW */}
      {children && (
        <Stack alignItems={textAlign} p={2}>
          {children}
        </Stack>
      )}
      {/* ACTIONS */}
      <Divider />
      <DialogActions>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{ color: 'black', borderColor: 'divider' }}
        >
          {cancelText}
        </Button>
        <Button
          autoFocus
          onClick={handleSubmit}
          color={color}
          variant="contained"
          startIcon={icon || <CheckIcon />}
        >
          {submitText}
        </Button>
      </DialogActions>
    </>
  );
};

export default ConfirmModal;
