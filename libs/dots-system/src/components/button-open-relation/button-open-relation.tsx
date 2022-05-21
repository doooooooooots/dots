import { useCallback } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { Button } from '@mui/material';
import useHistory from '../../hooks/use-history';
import { HistoryItem } from '../../hooks/use-history/index.d';
import { ActionButtonProps } from '../buttons';

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
    <Button startIcon={<LinkIcon />} onClick={handleClick} variant="text">
      {`${actionText}${multiple ? ' (' + count + ')' : ''}`}
    </Button>
  );
}

export default ButtonOpenRelation;
