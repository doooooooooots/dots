import { useHistory } from '@dots.cool/hooks';
import LinkIcon from '@mui/icons-material/Link';
import { Button } from '@mui/material';
import React, { useCallback } from 'react';

function ButtonOpenDetails(props) {
  const { path, title, component, linkText, count } = props;
  const { push } = useHistory();

  const handleClick = useCallback(() => {
    push({ path, title, component });
  }, [component, path, push, title]);

  return (
    <Button startIcon={<LinkIcon />} onClick={handleClick} variant="text">
      {`${linkText} (${count})`}
    </Button>
  );
}

export default ButtonOpenDetails;
