import { Stack } from '@mui/material';

function Kbd(props) {
  const { sx, ...other } = props;
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
    />
  );
}

export default Kbd;
