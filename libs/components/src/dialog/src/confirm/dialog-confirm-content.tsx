import { DialogContent as MuiDialogContent } from '@mui/material';

function DialogContent(props) {
  const { children } = props;
  return <MuiDialogContent sx={{ p: 0 }}>{children}</MuiDialogContent>;
}

export default DialogContent;
