import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ButtonBase from './button-base';

function ButtonStar(props) {
  const { tooltip = 'star', isActive } = props;

  return (
    <ButtonBase
      tooltip={tooltip}
      sx={{ color: isActive ? '#ffdf42' : 'neutral.300' }}
      icon={isActive ? <StarIcon /> : <StarBorderIcon />}
    />
  );
}

export default ButtonStar;
