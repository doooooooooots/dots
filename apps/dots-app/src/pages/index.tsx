import { LayoutMain } from '@dots.cool/components';
import { DotsPageIndex } from '@dots.cool/dots-system';
import { Grid } from '@mui/material';

export function Index() {
  return (
    <Grid container>
      <LayoutMain>
        <DotsPageIndex entityName="project" />
      </LayoutMain>
    </Grid>
  );
}

export default Index;
