import React from 'react';
import { useStore } from '../context/useStore';
import { Alert, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { useMountedState } from 'react-use';
import RefreshIcon from '@mui/icons-material/Refresh';

const StepRails = dynamic(() => import('../Steps/StepRails'), { ssr: false });

function TabPreview() {
  const store = useStore();
  const isRendered = store.isRendered();
  const currentStage = store.getCurrentStage();
  const isMounted = useMountedState();

  const handleClick = async () => {
    store.resetSnaps();
    store.setIsLoading(true);
    await store.snapRailsAndGenerator();
    store.setIsLoading(false);
  };

  return (
    <>
      <Alert severity="info">
        <Typography variant="h6" mb={3}>
          Cliquez ici pour mettre l&apos;aperçu à jour
        </Typography>
        <Button
          startIcon={<RefreshIcon />}
          variant="outlined"
          onClick={handleClick}
          disabled={!(isMounted && isRendered && currentStage)}
        >
          Refresh Render
        </Button>
      </Alert>
      {Object.values(store.snapshots).map((snap, index) => {
        return <img key={index} src={snap.snap} width="250px" />;
      })}
      <Box sx={{ visibility: 'hidden' }}>
        <StepRails />
      </Box>
    </>
  );
}

export default observer(TabPreview);
