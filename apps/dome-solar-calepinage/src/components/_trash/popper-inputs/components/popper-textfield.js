import { IconButton, InputAdornment, TextField } from '@mui/material';
import { usePopper } from '../hooks/use-popper';
import CloseIcon from '@mui/icons-material/Close';

const PopperTextField = (props) => {
  const {
    variant = 'outlined',
    size = 'small',
    sx,
    fullWidth,
    ...other
  } = props;

  const { pendingValue, onResetValue, onChange } = usePopper();

  const handleMouseDownInput = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      {...other}
      variant={variant}
      size={size}
      value={pendingValue}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="reset input"
              onClick={onResetValue}
              onMouseDown={handleMouseDownInput}
              edge="end"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onChange}
      fullWidth={fullWidth}
      autoFocus
      sx={[
        sx,
        {
          '& .MuiInputBase-root': {
            borderRadius: 1,
          },
        },
      ]}
    />
  );
};

export default PopperTextField;
