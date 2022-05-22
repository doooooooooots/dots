import { Box, Button, CircularProgress, Typography, Stack, Link } from '@mui/material';
import { usePDF, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { format } from 'date-fns';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { toKebabCase } from 'js-convert-case';
import moment from 'moment';
import PDFTemplateProject from './PDFTemplateProject';
import { useStore } from './context/useStore';
// import { addNewMediaTo } from '../../slices/media-object-slice';

export default function StepPreview() {
  const store = useStore();

  const fileName = store.lastMediaObjectVersion();

  const [isMounted, setIsMounted] = useState(false);

  const date = format(new Date(), 'dd/MM/yyyy');

  const PdfTemplate = useMemo(
    () => (
      <PDFTemplateProject
        pages={store.pages}
        // analytic={store.getGlobalAnalytic()}
        snaps={store.getSnaps()}
        form={store.defaultTargets}
        related={store.related}
        date={date}
        comments={store.comments}
      />
    ),
    [date, store]
  );

  const [instance] = usePDF({ document: PdfTemplate });

  useEffect(() => {
    if (isMounted && instance && !instance.loading && instance.url && fileName) {
      if ('blob' in instance) {
        instance.blob.name = fileName;
        instance.blob.width = 842;
        instance.blob.height = 595;
        // dispatch(addNewMediaTo(instance.blob, store.form.currentLayout));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance]);

  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isEmpty(store.getAnalytics()) || isEmpty(store.getSnaps())) {
    return null;
  }

  return (
    <Box display='flex' flexDirection='column' height='100%' width='100%'>
      <Stack direction='row' spacing={1}>
        <Button
          variant='outlined'
          onClick={() => store.setStep('summary')}
          startIcon={<NavigateBeforeIcon />}
          size='small'
        >
          Retour
        </Button>
        <Button
          component={Link}
          color='primary'
          variant='contained'
          size='small'
          download={`${store.related.project.guid}-${toKebabCase(store.related.project.name)}-${moment().format(
            'YYYY-DD-MM'
          )}.pdf`}
          href={instance?.url}
        >
          {instance.loading ? 'Chargement...' : 'Sauvegarder'}
        </Button>
      </Stack>

      {instance && (
        <>
          {instance.loading ? (
            <Box display='flex' justifyContent='center' alignItems='center' height={400}>
              <CircularProgress />
              <Typography variant='h1' ml={2}>
                Chargement
              </Typography>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <PDFViewer height='100%' style={{ border: 'none' }} width='100%' src={instance.url} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
