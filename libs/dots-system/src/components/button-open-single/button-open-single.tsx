import { useCallback } from 'react';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Button, Stack, Typography } from '@mui/material';
import useHistory from '../../hooks/use-history';
import { HistoryItem } from '../../hooks/use-history/index.d';
import { ActionButtonProps } from '../buttons.d';
import { Box } from '@mui/system';

type ButtonOpenSingleProps = HistoryItem &
  ActionButtonProps & {
    cellText: string;
  };

function ButtonOpenSingle(props: ButtonOpenSingleProps): JSX.Element {
  const {
    actionText = 'Open',
    cellText,
    path,
    title,
    Component,
    componentProps,
  } = props;
  const { push } = useHistory();

  const handleClick = useCallback(() => {
    push({ path, title, Component, componentProps });
  }, [push, path, title, Component, componentProps]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: 'relative', width: '100%' }}
    >
      <Typography>{cellText}</Typography>
      <Box position="absolute" right="0">
        <Button
          className="button--open-details"
          startIcon={<OpenInFullIcon />}
          onClick={handleClick}
          variant="outlined"
          size="small"
          sx={{
            '&, &:hover': {
              bgcolor: 'background.default',
            },
          }}
        >
          {actionText}
        </Button>
      </Box>
    </Stack>
  );
}

export default ButtonOpenSingle;
