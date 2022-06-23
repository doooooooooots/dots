import React, { useCallback } from 'react';
import { Stack, Button, Alert, Link } from '@mui/material';
import { useStore } from '../../contexts/useStore';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { observer } from 'mobx-react';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { gql, useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';

const SAVE_FILE = gql`
  mutation SaveFile($data: FileCreateInput!) {
    createFile(data: $data) {
      id
      name
      file {
        url
      }
    }
  }
`;

function SidebarPdf() {
  const { getRelatedData } = useStore();
  const instance = getRelatedData('pdf');

  const [saveFile, { data, loading }] = useMutation(SAVE_FILE);

  const handleSavePdf = useCallback(() => {
    saveFile({
      variables: {
        data: {
          name: `${moment().format('YYYY-DD-MM')}.pdf`,
          file: {
            upload: instance.blob,
          },
        },
      },
    });
  }, [instance, saveFile]);

  return (
    <Stack p={2} spacing={1}>
      <Alert severity="info">Vous pouvez sauvegarder le fichier en ligne</Alert>
      {isEmpty(data) ? (
        <>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<CloudUploadOutlinedIcon />}
            onClick={handleSavePdf}
            variant="contained"
            size="small"
            disabled={isEmpty(instance)}
          >
            Save online
          </LoadingButton>
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
        </>
      ) : (
        <Button
          startIcon={<FileDownloadOutlinedIcon />}
          component={Link}
          color="success"
          variant="contained"
          size="small"
          download={`${moment().format('YYYY-DD-MM')}.pdf`}
          href={data?.createFile?.file?.url}
          disabled={isEmpty(instance)}
        >
          Télécharger du cloud
        </Button>
      )}
    </Stack>
  );
}

export default observer(SidebarPdf);
