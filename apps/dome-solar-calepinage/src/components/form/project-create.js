import * as React from 'react';
import ProjectStep1 from './project/project-1-basic-infos';
import ProjectStep2 from './project/project-2-timing';
import ProjectStep3 from './project/project-3-field';
import { Button, Container, Divider, Grid, Stack } from '@mui/material';
import BasicTimeline from './project/project-sidebar';
import { Box } from '@mui/system';
import Sticky from 'react-stickynode';

export default function ProjectFormCreate() {
  const [store, setStore] = React.useState({ test1: '', test2: '', test3: '' });

  const onSubmit = (data) => {
    setStore({
      ...store,
      ...data,
    });
  };

  return (
    <Container sx={{ bgcolor: 'background.default' }}>
      <Grid container>
        <Grid item sx={{ width: 290 }}>
          <Sticky enabled={true} top={50} bottomBoundary={1200}>
            <BasicTimeline />
          </Sticky>
        </Grid>
        <Grid item xs>
          <ProjectStep1 onSubmit={onSubmit} store={store} />
          <Divider sx={{ my: 4 }} />
          <ProjectStep2 onSubmit={onSubmit} store={store} />
          <Divider sx={{ my: 4 }} />
          <ProjectStep3 onSubmit={onSubmit} store={store} />
          <Box mt={4}>
            <Stack direction="row" justifyContent="flex-end">
              <Button variant="contained" fullWidth>
                Enregistrer
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
