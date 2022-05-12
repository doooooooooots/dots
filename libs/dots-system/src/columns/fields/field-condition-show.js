import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function FieldConditionShow(params) {
  return (
    <Box display="flex" alignItems="center">
      <Box
        sx={{
          borderRadius: 5,
          color: `condition.${params.value}`,
          backgroundColor: `condition.${params.value}`,
          width: 20,
          height: 20,
        }}
      />
      <Typography color={`condition.${params.value}`} ml={1}>
        {params.value}
      </Typography>
    </Box>
  );
}
