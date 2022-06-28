import React from 'react';
import { useRouter } from 'next/router';
// import { DotsPageIndex } from '@dots.cool/dots-system';
import { Grid } from '@mui/material';
import {
  LayoutAppbar,
  LayoutMain,
  LoadingOverlay,
} from '@dots.cool/components';
import FormInDialog from '../../components/form-in-dialog';

function EntityName() {
  const router = useRouter();
  const { entityname } = router.query;

  if (!entityname) return <LoadingOverlay />;

  return (
    <Grid container>
      <LayoutAppbar>
        <FormInDialog variant="contained" size="small" entityName={entityname}>
          Créer un nouveau
        </FormInDialog>
      </LayoutAppbar>
      <LayoutMain>
        {/* <DotsPageIndex entityName={entityname as string} /> */}
      </LayoutMain>
    </Grid>
  );
}

export default EntityName;
