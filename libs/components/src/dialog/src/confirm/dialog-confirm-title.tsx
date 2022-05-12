import {
  Stack,
  DialogTitle as MuiDialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function DialogTitle(props) {
  const { onClose, children } = props;

  return (
    <MuiDialogTitle
      sx={{ p: 1, borderRadius: 1, bgcolor: 'background.default' }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
      >
        {children}
        {/* Close btns */}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
    </MuiDialogTitle>
  );
}

export default DialogTitle;
