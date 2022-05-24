import { Box, Typography, Stack } from '@mui/material';
import { isEmpty } from 'lodash';

const FielGroup = (props) => {
  const { icon, label, value } = props;
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Stack
        direction="row"
        spacing={1}
        width={155}
        color="grey.600"
        alignItems="center"
        sx={{
          '& .MuiSvgIcon-root': {
            width: 16,
            height: 16,
          },
        }}
      >
        {!isEmpty(icon) && icon}
        <Typography
          variant="body2"
          sx={{
            py: 0.5,
            display: 'bloc',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Typography>
      </Stack>
      <Box
        sx={{
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'grey.100',
          },
          flex: 1,
          minHeight: 30,
          p: 0.5,
          px: 1,
        }}
      >
        <Typography variant="body2">{value}</Typography>
      </Box>
    </Stack>
  );
};

export default FielGroup;
