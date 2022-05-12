import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Button, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import useHistory from '../../hoc/with-smart-history/use-history';

function ButtonOpenSingle(props) {
  const { cellText, path, title, Component } = props;
  const { push } = useHistory();

  const handleClick = useCallback(() => {
    push({ path, title, Component });
  }, [Component, path, push, title]);

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
