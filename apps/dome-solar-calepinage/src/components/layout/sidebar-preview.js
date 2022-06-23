import React, { useCallback } from 'react';
import { Stack, Button, Divider } from '@mui/material';
import { useStore } from '../../contexts/useStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

function SidePreview() {
  const { setCurrentPage } = useStore();

  const handleSavePdf = useCallback(() => {
    setCurrentPage('pdf');
  }, [setCurrentPage]);

  const handleGoBack = useCallback(() => {
    setCurrentPage('layout');
  }, [setCurrentPage]);

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleGoBack}
        variant="standard"
        size="small"
      >
        Retour au calepinage
      </Button>
      <Divider />
      <Stack p={2} spacing={2}>
        <Button
          endIcon={<ArrowForwardOutlinedIcon />}
          onClick={handleSavePdf}
          variant="contained"
          size="small"
        >
          Créer le pdf
        </Button>
      </Stack>
    </>
  );
}

export default SidePreview;
