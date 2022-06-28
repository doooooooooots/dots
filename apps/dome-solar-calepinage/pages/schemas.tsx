import { Grid } from '@mui/material';
import { DotsPageIndex } from '@dots.cool/dots-system';
import { LayoutMain } from '@dots.cool/components';

function Schemas() {
  return (
    <Grid container>
      <LayoutMain>
        <DotsPageIndex entityName="project" />
      </LayoutMain>
    </Grid>

    // <Container maxWidth="lg" sx={{ py: 10 }}>
    //   <Stack m="auto" spacing={3}>
    //     <FormInDialog entityName={'project'}>
    //       Créer un nouveau projet
    //     </FormInDialog>
    //   </Stack>
    // </Container>
  );
}

export default Schemas;
