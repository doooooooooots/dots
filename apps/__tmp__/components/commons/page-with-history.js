import React, { useCallback } from 'react';
import { useStateWithHistory } from 'react-use';
import DialogActions from '@mui/material/DialogActions';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

function PageWithHistory(props) {
  const { initialState, capacity = 10, initialHistory, children } = props;

  const [state, setState, stateHistory] = useStateWithHistory(initialState, capacity, initialHistory);

  const canGoForward = stateHistory.history.length && stateHistory.position !== stateHistory.history.length - 1;
  const canGoBack = stateHistory.position !== 0;

  const handleClose = useCallback(() => {
    setState(false);
  }, [setState]);

  const goBack = useCallback(() => {
    stateHistory.back();
  }, [stateHistory]);

  const goForward = useCallback(() => {
    stateHistory.forward();
  }, [stateHistory]);

  return (
    <Box open={state} onClose={handleClose}>
      <Box>
        <Stack direction='row' justifyContent='space-between'>
          <Stack direction='row' alignItems='center'>
            <IconButton onClick={goBack} disabled={!canGoBack}>
              <ArrowBackIosIcon fontSize='inherit' />
            </IconButton>
            <IconButton onClick={goForward} disabled={!canGoForward}>
              <ArrowForwardIosIcon fontSize='inherit' />
            </IconButton>
            <Typography variant='h6' sx={{ ml: 1 }}>
              {stateHistory.history.join('/')}
            </Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Button>Ajouter une offre</Button>
            <Divider orientation='vertical' flexItem />
            <Box>
              <IconButton>
                <OpenInFullIcon font />
              </IconButton>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Box>{children && typeof children === 'function' && children(state, setState)}</Box>
      <DialogActions></DialogActions>
    </Box>
  );
}

export default PageWithHistory;
