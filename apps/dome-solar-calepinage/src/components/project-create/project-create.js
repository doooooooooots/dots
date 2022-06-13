import * as React from 'react';
import { Button, Grid, Stack, Container } from '@mui/material';

import { Box } from '@mui/system';
import Sticky from 'react-stickynode';
import BasicTimeline from '../dots-system/project/project-sidebar';
import Project1BasicInfos from '../dots-system/project/project-1-basic-infos';
import ProjectTiming from '../dots-system/project/project-2-timing';

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
            <Project1BasicInfos onSubmit={onSubmit} />
            <ProjectTiming onSubmit={onSubmit} />
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
