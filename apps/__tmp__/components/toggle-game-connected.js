import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import YgoLogo from '@public/assets/logos/yugioh.svg';
import PokemonLogo from '@public/assets/logos/pokemon.svg';
import { Select } from '@mui/material';

// const selector = (state) => state.app.gameId;

function ToggleGameConnected(props) {
  // const handleChangeGame = React.useCallback(
  //   (event) => {
  //     dispatch(setValue('gameId', event.target.value));
  //   },
  //   [dispatch]
  // );

  return (
    <Select
      labelId='game-toggle'
      id='game-toggle'
      variant='standard'
      value={3 || 'pokemon'}
      // onChange={handleChangeGame}

      {...props}
    >
      <MenuItem value={6}>
        <PokemonLogo width='110' height='30' />
      </MenuItem>

      <MenuItem value={3}>
        <YgoLogo width='110' height='30' />
      </MenuItem>
    </Select>
  );
}

export default React.memo(ToggleGameConnected);
