import React, { useCallback } from 'react';
import { Stack, Button, Alert, Link } from '@mui/material';
import { useStore } from '../../contexts/useStore';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { observer } from 'mobx-react';
import moment from 'moment';
import { isEmpty } from 'lodash';

function SidebarPdf() {
  const { getRelatedData, setCurrentPage } = useStore();
  const instance = getRelatedData('pdf');

  const handleSavePdf = useCallback(() => {}, [setCurrentPage]);

  return (
    <Stack p={2} spacing={1}>
      <Alert severity="info">Vous pouvez sauvegarder le fichier en ligne</Alert>
      <Button
        startIcon={<CloudUploadOutlinedIcon />}
        onClick={handleSavePdf}
        variant="contained"
        size="small"
        disabled={isEmpty(instance)}
      >
        Save online
      </Button>
      <Button
        startIcon={<FileDownloadOutlinedIcon />}
        component={Link}
        color="primary"
        variant="outlined"
        size="small"
        download={`${moment().format('YYYY-DD-MM')}.pdf`}
        href={instance?.url}
        disabled={isEmpty(instance)}
      >
        {instance?.loading ? 'Chargement...' : 'Sauvegarder'}
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

      </Stack> */}
    </Stack>
  );
}

export default observer(SidebarPdf);
