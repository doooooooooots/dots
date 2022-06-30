import React from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import {
  LayoutAppbar,
  LayoutMain,
  LoadingOverlay,
} from '@dots.cool/components';
import { DotsDatagrid } from '@dots.cool/dots-system';

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
    </Grid>
  );
}

export default EntityName;
