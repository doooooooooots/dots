import { useHistory } from '@dots.cool/hooks';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Button, Stack, Typography } from '@mui/material';
import React, { useCallback } from 'react';

function ButtonOpenSingle(props) {
  const { cellText, path, title, component } = props;
  const { push } = useHistory();

  const handleClick = useCallback(() => {
    push({ path, title, component });
  }, [component, path, push, title]);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography>{cellText}</Typography>
      <Button
        className="button--open-details"
        startIcon={<OpenInFullIcon />}
        onClick={handleClick}
        color="neutral"
        variant="outlined"
        size="small"
      >
        Open
      </Button>
    </Stack>
  );
}

export default ButtonOpenSingle;
