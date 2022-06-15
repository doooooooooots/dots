import { IconButton, InputAdornment, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PopperTextField = (props) => {
  const {
    value,
    onChange,
    onClear,
    variant = 'outlined',
    size = 'small',
    sx,
    fullWidth,
    ...other
  } = props;

  return (
    <TextField
      {...other}
      variant={variant}
      size={size}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="reset input" onClick={onClear} edge="end">
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
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
