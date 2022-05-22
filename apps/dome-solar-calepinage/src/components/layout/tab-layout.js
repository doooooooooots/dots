import React from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@mui/system';
import { useStore } from '../context/useStore';
import { observer } from 'mobx-react';

const StepLayout = dynamic(() => import('../Steps/StepLayout'), { ssr: false });

const TabLayout = () => {
  const store = useStore();
  return (
    <Box
      sx={[
        store.getViewMode() === 'pan' && {
          cursor: 'grab',
        },
      ]}
    >
      <StepLayout />
    </Box>
  );
};

export default observer(TabLayout);
