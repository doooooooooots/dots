import * as React from 'react';
import ProjectStep1 from './molecule/project/project-1-basic-infos';
import ProjectStep2 from './molecule/project/project-2-timing';
import { Button, Grid, Stack, Container } from '@mui/material';
import BasicTimeline from './molecule/project/project-sidebar';
import { Box } from '@mui/system';
import Sticky from 'react-stickynode';

export default function ProjectFormCreate() {
  const [store, setStore] = React.useState({});

  const onSubmit = (data) => {
    setStore({
      ...store,
      ...data,
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} flexWrap="nowrap">
        <Grid item sx={{ width: 250 }}>
          <Sticky enabled={true} top={140}>
            <BasicTimeline />
          </Sticky>
        </Grid>
        <Grid item xs>
          <Box sx={{ bgcolor: 'background.default', p: 5, borderRadius: 2 }}>
            <ProjectStep1 onSubmit={onSubmit} />
            <ProjectStep2 onSubmit={onSubmit} />
            <Box mt={4}>
              <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained" fullWidth>
                  Enregistrer
                </Button>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
