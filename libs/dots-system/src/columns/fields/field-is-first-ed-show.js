import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function FieldIsFirstEdShow({ value }) {
  return (
    <IconButton aria-label="delete">
      {value && <CheckCircleIcon color="success" />}
    </IconButton>
  );
}
