import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

function ButtonOpenSingle(props): JSX.Element {
  const { size, actionText = 'Open', cellText, onClick } = props;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: 'relative', width: '100%' }}
    >
      <Typography>{cellText}</Typography>
      <Box position="absolute" right="0">
        <Button
          className="button--open-details"
          startIcon={<OpenInFullIcon />}
          onClick={onClick}
          variant="outlined"
          color="neutral"
          size="small"
          sx={[
            {
              '&, &:hover': {
                bgcolor: 'background.default',
              },
            },
            size === 'small' && {
              height: 25,
            },
          ]}
        >
          {actionText}
        </Button>
      </Box>
    </Stack>
  );
}

export default ButtonOpenSingle;
