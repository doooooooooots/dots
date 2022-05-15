import { Dialog as MuiDialog, Stack } from '@mui/material';

function Dialog(props: any) {
  const { children, open, onClose, maxWidth = 'md' } = props;

  return (
    <MuiDialog
      {...props}
      maxWidth={maxWidth}
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
