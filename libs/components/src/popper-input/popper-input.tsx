import React from 'react';
import {
  alpha,
  CircularProgress,
  IconButton,
  InputBase,
  Stack,
  useTheme,
} from '@mui/material';
import Clear from '@mui/icons-material/Clear';

const PopperInput = (props, ref) => {
  const { loading, onClear, inputProps, sx = {}, ...other } = props;
  const { value } = inputProps;
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      ref={ref}
      position="relative"
      sx={sx}
    >
      <InputBase
        inputProps={inputProps}
        {...other}
        sx={[
          {
            padding: 1,
            width: '100%',
            borderBottom: 1,
            borderColor: 'divider',
            '& input': {
              borderRadius: 0.5,
              backgroundColor: 'background.default',
              p: 1,
              pr: 5,
              transition: theme.transitions.create([
                'border-color',
                'box-shadow',
              ]),
              border: 1,
              borderColor: 'divider',
              fontSize: 14,
              '&:focus': {
                boxShadow: `0px 0px 0px 3px ${
                  theme.palette.mode === 'light'
                    ? alpha(theme.palette.primary.main, 0.2)
                    : theme.palette.primary.main
                }`,
                borderColor: 'primary.main',
              },
            },
          },
        ]}
      />
      {loading ? (
        <CircularProgress
          sx={{ position: 'absolute', right: 26 }}
          color="inherit"
          size={15}
        />
      ) : value ? (
        <IconButton
          onClick={onClear}
          size="small"
          sx={{ position: 'absolute', right: 18 }}
        >
          <Clear fontSize="small" />
        </IconButton>
      ) : null}
    </Stack>
  );
};

export default React.forwardRef(PopperInput);
