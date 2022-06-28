import { Box, CircularProgress, Typography } from '@mui/material';
import { usePDF, PDFViewer } from '@react-pdf/renderer';
import PdfLayoutTemplate from '../pdf/pdf-layout-template';
import { useStore } from '../../../contexts/useStore';
import { useEffect, useState } from 'react';
import moment from 'moment';
// import { addNewMediaTo } from '../../slices/media-object-slice';

export default function StepPreview() {
  const store = useStore();
  const {
    setRelatedData,
    getAllRelatedData,
    getMassBalance,
    getPages,
    getSnaps,
    getComments,
  } = store;

  const { project, roof, cladding, layout, product, solarModule } =
    getAllRelatedData();
  const summary = getMassBalance();
  const pages = getPages();
  const snaps = getSnaps();
  const comments = getComments();

  // const fileName = store.lastMediaObjectVersion();
  const [isMounted, setIsMounted] = useState(false);
  const date = moment().format('dd/MM/YYYY');

  const [instance] = usePDF({
    document: (
      <PdfLayoutTemplate
        pages={pages}
        summary={summary}
        snaps={snaps}
        project={project}
        roof={roof}
        cladding={cladding}
        layout={layout}
        product={product}
        solarModule={solarModule}
        date={date}
        comments={comments}
      />
    ),
  });

  useEffect(() => {
    if (isMounted && instance && !instance.loading && instance.url) {
      if ('blob' in instance) {
        instance.blob.width = 842;
        instance.blob.height = 595;
        instance.blob.name = `${project.name}-cladding-${moment().format(
          'YYYY-DD-MM'
        )}.pdf`;
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