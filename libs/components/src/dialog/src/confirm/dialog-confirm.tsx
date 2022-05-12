import { Dialog as MuiDialog, Stack } from '@mui/material';

function Dialog(props) {
  const { children, open, onClose } = props;

  return (
    <MuiDialog
      {...props}
      maxWidth="md"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { bgcolor: 'neutral.25', p: 2 } }}
      fullWidth
    >
      <Stack spacing={1}>{children}</Stack>
    </MuiDialog>
  );
}

export default Dialog;
