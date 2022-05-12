import { Button } from '@mui/material';
import React from 'react';
import { useKeyPressEvent } from 'react-use';
import Kbd from './Kbd';

const KbdButton = (props) => {
  const { kbd, children, onClick, fullWidth, sx } = props;

  useKeyPressEvent((e) => e.key.toLowerCase() === kbd, onClick);

  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: 'neutral.100',
        width: fullWidth ? '100%' : 'inherit',
        boxShadow: (theme) => theme.shadowStyles.stripe,
        ...sx
      }}
    >
      {children}
      <Kbd sx={{ ml: 0.5 }}>{kbd}</Kbd>
    </Button>
  );
};

export default React.memo(KbdButton);
