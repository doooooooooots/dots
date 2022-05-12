import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, Stack, Typography } from '@mui/material';

function HistoryTopBar(props) {
  const { goBack, canGoBack, goForward, canGoForward, history, position } = props;
  return (
    <Stack direction='row' alignItems='center'>
      <IconButton onClick={goBack} disabled={!canGoBack}>
        <ArrowBackIosIcon fontSize='inherit' />
      </IconButton>
      <IconButton onClick={goForward} disabled={!canGoForward}>
        <ArrowForwardIosIcon fontSize='inherit' />
      </IconButton>
      <Typography variant='h6' sx={{ ml: 1 }}>
        {history.slice(0, position + 1).join('/')}
      </Typography>
    </Stack>
  );
}

export default HistoryTopBar;

// <Box open={state} onClose={handleClose}>
//   <Box>
//     <Stack direction='row' justifyContent='space-between'>
//       <Stack direction='row' alignItems='center'>
//         <IconButton onClick={goBack} disabled={!canGoBack} >
//           <ArrowBackIosIcon fontSize='inherit' />
//         </IconButton>
//         <IconButton onClick={goForward} disabled={!canGoForward} >
//           <ArrowForwardIosIcon fontSize='inherit' />
//         </IconButton>
//         <Typography variant='h6' sx={{ ml: 1 }}>
//           {stateHistory.history.join('/')}
//         </Typography>
//       </Stack>
//       <Stack direction='row' alignItems='center' spacing={1}>
//         <Button >Ajouter une offre</Button>
//         <Divider orientation='vertical' flexItem />
//         <Box>
//           <IconButton>
//             <OpenInFullIcon font />
//           </IconButton>
//         </Box>
//       </Stack>
//     </Stack>
//   </Box>
//   <Box>{children && typeof children === 'function' && children(state, setState)}</Box>
//   <DialogActions></DialogActions>
// </Box>;
