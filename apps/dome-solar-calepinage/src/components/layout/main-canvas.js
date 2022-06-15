import React from 'react';
import { useStore } from '../../contexts/useStore';
import StepSummary from './steps/step-summary';
import RenderActionOverlay from '../render-action-overlay';
import StepShowPdf from './steps/show-pdf';
import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import Loading from '../design-system/screens/loading-screen';

const SnapAllColumnDetails = dynamic(
  () => import('./steps/snap-all-column-details'),
  { ssr: false }
);
const SnapTypeColumn = dynamic(() => import('./steps/snap-type-column'), {
  ssr: false,
});
const StepLayout = dynamic(() => import('./steps/step-layout'), {
  ssr: false,
});

function MainCanvas() {
  const store = useStore();

  return (
    <Box
      sx={[
        { height: '100%' },
        store.getViewMode() === 'pan' && {
          cursor: 'grab',
        },
      ]}
    >
      {/*//* Main layout */}
      {store.getCurrentPage() === 'layout' && <StepLayout />}
      {/*//* Rendering Layers */}
      {store.getCurrentPage() === 'rails' && <SnapAllColumnDetails />}
      {store.getCurrentPage() === 'markup' && <SnapTypeColumn />}
      {/*//* Preview Slides */}
      {store.getCurrentPage() === 'preview' && <StepSummary />}
      {/*//* Final PDF */}
      {store.getCurrentPage() === 'pdf' && <StepShowPdf />}

      {/*//? Information layer */}
      {store.getNeedRerender() && <RenderActionOverlay />}
      {/*//? Information layer */}
      {store.isLoading() && <Loading />}
    </Box>
  );
}

export default observer(MainCanvas);
