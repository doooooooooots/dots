import { Box, CircularProgress, Typography } from '@mui/material';
import { usePDF, PDFViewer } from '@react-pdf/renderer';
import { format } from 'date-fns';
import PdfLayoutTemplate from '../pdf/pdf-layout-template';
import { useStore } from '../../../contexts/useStore';
import { useEffect, useState } from 'react';
import moment from 'moment';
// import { addNewMediaTo } from '../../slices/media-object-slice';

export default function StepPreview() {
  const store = useStore();
  const { setRelatedData } = store;

  // const fileName = store.lastMediaObjectVersion();
  const [isMounted, setIsMounted] = useState(false);
  const date = format(new Date(), 'dd/MM/yyyy');

  const [instance] = usePDF({
    document: (
      <PdfLayoutTemplate
        pages={store.pages}
        analytic=""
        snaps={store.getSnaps()}
        form={store.defaultTargets}
        related={store.related}
        date={date}
        comments={store.comments}
      />
    ),
  });

  useEffect(() => {
    if (isMounted && instance && !instance.loading && instance.url) {
      if ('blob' in instance) {
        instance.blob.width = 842;
        instance.blob.height = 595;
        instance.blob.name = `test-de-nom-${moment().format('YYYY-DD-MM')}.pdf`;
        setRelatedData('pdf', instance);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { loading, url } = instance;

  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%">
      {loading || !url ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={400}
        >
          <CircularProgress />
          <Typography variant="h1" ml={2}>
            Chargement
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <PDFViewer
            height="100%"
            style={{ border: 'none' }}
            width="100%"
            src={url}
          />
        </Box>
      )}
    </Box>
  );
}
