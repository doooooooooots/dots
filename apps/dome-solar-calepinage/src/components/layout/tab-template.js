import { Grid } from '@mui/material';
import dynamic from 'next/dynamic';

const StepTemplate = dynamic(() => import('./steps/show-template'), {
  ssr: false,
});

const TabTemplate = () => {
  return (
    <Grid container>
      <Grid item xs={2}></Grid>
      <Grid item xs={10}>
        <StepTemplate />
      </Grid>
    </Grid>
  );
};

export default TabTemplate;
