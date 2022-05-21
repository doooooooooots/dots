import { Grid, Typography } from '@mui/material';
import { DotsPageIndex } from '@dots.cool/dots-system';
import { LayoutMain } from '@dots.cool/components';

const ExamplePage = (props) => {
  return (
    <Grid container>
      <LayoutMain>
        <DotsPageIndex entityName="storage" />
      </LayoutMain>
    </Grid>
  );
};

export default ExamplePage;
