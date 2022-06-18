import { React } from 'react';
import { Typography } from '@mui/material';
import StyledItem from './styled-item';

/**
 * LABEL
 */

const LabelStatus = (props, ref) => {
  const { label, color, sx = {}, ...other } = props;
  return (
    <StyledItem {...other} ref={ref}>
      <Typography
        variant="caption"
        sx={{
          px: 1.5,
          py: 0.5,
          m: 0,
          borderRadius: 1,
          textTransform: 'uppercase',
          cursor: 'pointer',
          bgcolor: (theme) => `${theme.palette[color].background}`,
          color: (theme) => `${theme.palette[color].main}!important`,
          '&:hover': {
            bgcolor: (theme) => `${theme.palette[color].hover}`,
          },
          ...sx,
        }}
        {...other}
      >
        {label}
      </Typography>
    </StyledItem>
  );
};

export default React.forwardRef(LabelStatus);
