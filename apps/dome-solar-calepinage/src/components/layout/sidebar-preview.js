import React, { useCallback } from 'react';
import { Stack, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import { useStore } from '../context/useStore';

function SidePreview() {
  const { setCurrentPage } = useStore();

  const handleSavePdf = useCallback(() => {
    setCurrentPage('pdf');
  }, [setCurrentPage]);

  const handleGoBack = useCallback(() => {
    setCurrentPage('layout');
  }, [setCurrentPage]);

  return (
    <Stack p={2} spacing={2}>
      <Button
        startIcon={<SaveIcon />}
        onClick={handleGoBack}
        variant="outlined"
        size="small"
      >
        Modifier le calepinage
      </Button>
      <Button
        startIcon={<SaveIcon />}
        onClick={handleSavePdf}
        variant="contained"
        size="small"
      >
        Enregistrer
      </Button>

      {/* <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          onClick={() => store.setStep('summary')}
          startIcon={<NavigateBeforeIcon />}
          size="small"
        >
          Retour
        </Button>
        <Button
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
        </Button>
      </Stack> */}
    </Stack>
  );
}

export default SidePreview;
