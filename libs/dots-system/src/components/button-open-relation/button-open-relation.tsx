import { useCallback } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { Button } from '@mui/material';
import useHistory from '../../hooks/use-history';
import { HistoryItem } from '../../hooks/use-history/index.d';
import { ActionButtonProps } from '../buttons';
import { Box } from '@mui/system';

type ButtonOpenDetailsProps = HistoryItem &
  ActionButtonProps & {
    count?: number;
    multiple?: boolean;
  };

function ButtonOpenRelation(props: ButtonOpenDetailsProps): JSX.Element {
  const {
    path,
    title,
    Component,
    componentProps,
    actionText,
    count,
    multiple,
  } = props;
  const { push } = useHistory();

  const handleClick = useCallback(() => {
    push({ path, title, Component, componentProps });
  }, [push, path, title, Component, componentProps]);

  return (
    <Button
      startIcon={<LinkIcon />}
      onClick={handleClick}
      variant="text"
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        width: 190,
      }}
    >
      <Box
        component="span"
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {`${actionText}${multiple ? ' (' + count + ')' : ''}`}
      </Box>
    </Button>
  );
}

export default ButtonOpenRelation;
