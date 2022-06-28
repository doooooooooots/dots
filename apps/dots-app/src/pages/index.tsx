import { LayoutAppbar, LayoutMain } from '@dots.cool/components';
import { DotsPageIndex } from '@dots.cool/dots-system';
import { Grid } from '@mui/material';

export function Index() {
  return (
    <Grid container>
      <LayoutAppbar />
      <LayoutMain>
        <DotsPageIndex entityName="layout" />
      </LayoutMain>
    </Grid>
  );
}

export default Index;
