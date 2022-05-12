import { DialogActions as MuiDialogActions } from '@mui/material';

function DialogActions(props) {
  const { children } = props;
  return <MuiDialogActions>{children}</MuiDialogActions>;
}

export default DialogActions;
