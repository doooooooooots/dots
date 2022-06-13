import React, { useCallback } from 'react';
import { Stack, Button, Divider } from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import { useStore } from '../../context/useStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBackOutlined';

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
          startIcon={<SaveIcon />}
          onClick={handleSavePdf}
          variant="contained"
          size="small"
        >
          Enregistrer
        </Button>

        {/* <Button
          component={Link}
          color="primary"
          variant="contained"
          size="small"
          download={`${store?.related?.project?.guid}-${toKebabCase(
            store?.related?.project?.name
          )}-${moment().format('YYYY-DD-MM')}.pdf`}
          href={instance?.url}
        >
          {instance.loading ? 'Chargement...' : 'Sauvegarder'}
        </Button> */}
      </Stack>
    </>
  );
}

export default SidePreview;
