import React, { useCallback } from 'react';
import { useStore } from '../../../contexts/useStore';
import { Stack, Button, Alert, Link, Divider } from '@mui/material';
import { observer } from 'mobx-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { isEmpty } from 'lodash';
import { LoadingButton } from '@mui/lab';
import { gql, useMutation } from '@apollo/client';
import moment from 'moment';

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
  const { getRelatedData, setCurrentPage } = useStore();
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

  const handleGoBackTo = (whereTo) => {
    setCurrentPage(whereTo);
  };

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => handleGoBackTo('layout')}
        variant="standard"
        size="small"
      >
        Retour au calepinage
      </Button>
      <Divider />
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => handleGoBackTo('preview')}
        variant="standard"
        size="small"
      >
        Retour au preview pdf
      </Button>
      <Divider />
      <Stack p={2} spacing={1}>
        <Alert severity="info">
          Vous pouvez sauvegarder le fichier en ligne
        </Alert>
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
    </>
  );
}

export default observer(SidebarPdf);
