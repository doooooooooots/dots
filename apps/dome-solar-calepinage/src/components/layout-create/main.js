import React from 'react';
import dynamic from 'next/dynamic';

// Context
import { observer } from 'mobx-react';
import { useStore } from '../../contexts/useStore';

// Mui
import { Box } from '@mui/material';

// Design System
import Loading from '../design-system/screens/loading-screen';

// Components
import OverlayRenderAction from './main/overlay-render-action';
import ViewOnboarding from './main/view-onboarding';
import ViewMassBalance from './main/view-mass-balance';
import ViewPdf from './main/view-pdf';
import ViewSummary from './main/view-summary';
const ViewLayout = dynamic(() => import('./main/view-layout'), {
  ssr: false,
});
const SnapTypeColumn = dynamic(() => import('./main/snap-type-column'), {
  ssr: false,
});
const SnapAllColumnDetails = dynamic(
  () => import('./main/snap-all-column-details'),
  { ssr: false }
);

/**
 * Page Layout - Create - Main
 */
function Main() {
  const store = useStore();

  const viewMode = store.getViewMode();
  const currentPage = store.getCurrentPage();
  const loading = store.isLoading();
  const needRender = store.getNeedRerender();

  if (!(store.hasRequiredInfos() && store.hasConfirmedOnBoarding()))
    return <ViewOnboarding />;

  return (
    <Box
      sx={[
        { height: '100%' },
        viewMode === 'pan' && {
          cursor: 'grab',
        },
      ]}
    >
      {currentPage === 'layout' && <ViewLayout />}
      {currentPage === 'rails' && <SnapAllColumnDetails />}
      {currentPage === 'markup' && <SnapTypeColumn />}
      {currentPage === 'massBalance' && <ViewMassBalance />}
      {currentPage === 'preview' && <ViewSummary />}
      {currentPage === 'pdf' && <ViewPdf />}

      {/*//? Information layer */}
      {needRender && <OverlayRenderAction />}
      {loading && <Loading />}
    </Box>
  );
}

export default observer(Main);
