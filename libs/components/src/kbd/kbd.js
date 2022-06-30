import { Stack } from '@mui/material';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';

function Kbd(props) {
  const { shortcut, children, useCmd, sx, ...other } = props;
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      as="kbd"
      sx={[
        sx,
        {
          px: 1,
          borderRadius: '4px',
          border: 1,
          color: 'neutral.400',
          borderColor: 'neutral.200',
          textTransform: 'capitalize',
          typography: 'caption',
        },
      ]}
      {...other}
    >
      <span>{children}</span>
      {shortcut && (
        <Stack direction="row" alignItems="center">
          {useCmd && (
            <>
              <KeyboardCommandKeyIcon fontSize="inherit" />
              <span>+</span>
            </>
          )}
          <span>{shortcut}</span>
        </Stack>
      )}
    </Stack>
  );
}

export default Kbd;
