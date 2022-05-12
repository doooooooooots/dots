import { Dialog as MuiDialog, Stack } from '@mui/material';

function Dialog(props) {
  const { children, open, onClose, other } = props;

  return (
    <MuiDialog
      {...other}
      maxWidth="xl"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { p: 2, height: '100%', bgcolor: 'background.default' },
      }}
      fullWidth
    >
      <Stack spacing={1}>{children}</Stack>
    </MuiDialog>
  );
}

export default Dialog;
