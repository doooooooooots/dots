import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ButtonBase from './button-base';

export default function ButtonFavorite(props) {
  const { tooltip = 'favorite', isActive } = props;

  return (
    <ButtonBase
      tooltip={tooltip}
      sx={{ color: isActive ? '#ff4242' : 'neutral.300' }}
      icon={isActive ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    />
  );
}
