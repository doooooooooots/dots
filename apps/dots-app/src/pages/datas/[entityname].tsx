import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import {
  LayoutAppbar,
  LayoutMain,
  LoadingOverlay,
} from '@dots.cool/components';

import {
  DotsDatagrid,
  HistoryBrowser,
  useHistory,
} from '@dots.cool/dots-system';

function EntityName() {
  const router = useRouter();
  const { entityname } = router.query;

  if (!entityname) return <LoadingOverlay />;

  return (
    <Grid container>
      <LayoutAppbar />
      <LayoutMain>
        <DotsDatagrid entityName={entityname} variant="details" />
      </LayoutMain>
      <HistoryBrowser maxWidth="lg" fullWidth />
    </Grid>
  );
}

export default EntityName;
