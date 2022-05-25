import React from 'react';
import { useStore } from '../context/useStore';
import TabLayout from './tab-layout';
import StepSummary from '../steps/StepSummary';
import RenderActionOverlay from '../render-action-overlay';
import StepShowPdf from '../steps/StepShowPdf';
import { observer } from 'mobx-react';

function MainCanvas() {
  const store = useStore();

  return (
    <>
      {store.getCurrentPage() === 'layout' && <TabLayout />}
      {store.getCurrentPage() === 'preview' && <StepSummary />}
      {store.getCurrentPage() === 'pdf' && <StepShowPdf />}
      {store.getNeedRerender() && <RenderActionOverlay />}
    </>
  );
}

export default observer(MainCanvas);
