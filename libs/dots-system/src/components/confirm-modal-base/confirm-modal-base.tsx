import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';

interface ConfirmModalProps {
  children: React.FC;
  color:
    | 'inherit'
    | 'success'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
  description: string;
  icon: JSX.Element;
  cancelText: string;
  onCancel: () => void;
  submitText: string;
  onSubmit: () => Promise<unknown[]>;
  onSubmitCallback: (args: unknown[]) => void;
  textAlign: 'left' | 'center' | 'right';
  title: string;
}

const ConfirmModal = (props: ConfirmModalProps) => {
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
        <Button onClick={onCancel} variant="outlined">
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
