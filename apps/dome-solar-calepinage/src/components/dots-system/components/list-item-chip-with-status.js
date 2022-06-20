import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import StyledItem from './styled-item';

export const ChipWithStatus = (props) => {
  const { label, color = 'neutral', fullColor } = props;

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        px: 1.5,
        py: 0.25,
        borderRadius: '100px',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: fullColor ? `border.${color}` : 'border.neutral',
        '&:hover': {
          borderColor: `${color}.main`,
          '& .MuiTypography-root': {
            color: `${color}.main`,
          },
        },
      }}
    >
      <Box bgcolor={`${color}.main`} width={6} height={6} borderRadius="50%" />
      <Typography
        color={fullColor ? `${color}.main` : 'neutral.600'}
        variant="caption"
        fontWeight={500}
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: 150,
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

ChipWithStatus.bindProps = ({ label, color }) => ({
  label,
  color,
});

/**
 * CHIP STATUS
 */
const ListItemChipWithStatus = (props, ref) => {
  const {
    value,
    label,
    index,
    max,
    color = 'neutral',
    fullColor,
    ...other
  } = props;

  return (
    <StyledItem {...other} ref={ref}>
      <ChipWithStatus label={label} color={color} fullColor={fullColor} />
    </StyledItem>
  );
};

export default React.forwardRef(ListItemChipWithStatus);
