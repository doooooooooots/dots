import React from 'react';
import { Button, Stack } from '@mui/material';

const transformAlign = (align) => {
  switch (align) {
    case 'center':
      return 'center';
    case 'left':
    case 'start':
    default:
      return 'flex-start';
    case 'right':
    case 'end':
      return 'flex-end';
  }
};

function ActionsButtonBar(props) {
  const {
    primary,
    primaryOnClick,
    secondary = 'Annuler',
    secondaryOnClick,
    align = 'center',
  } = props;
  return (
    <Stack
      direction="row"
      justifyContent={transformAlign(align)}
      spacing={1}
      textAlign="center"
      mt={2}
    >
      <Button variant="outlined" type="submit" onClick={secondaryOnClick}>
        {secondary}
      </Button>
      <Button variant={'contained'} type="submit" onClick={primaryOnClick}>
        {primary}
      </Button>
    </Stack>
  );
}

export default ActionsButtonBar;
