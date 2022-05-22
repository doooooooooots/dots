import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  TextField,
  Grid,
  Typography,
  Divider,
  Alert,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import { useStore } from './context/useStore';
// import StepSummaryQuantitative from './StepSummaryQuantitative';

const slideProps = {
  height: 'calc(100vh - 120px)',
  overflow: 'hidden',
  border: 1,
  p: 3
};

const Slide = (props) => {
  const { name, comment, onCommentChange, children, info, sx = {} } = props;
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };

  if (!children) return null;

  return (
    <Box sx={{ ...slideProps, ...sx }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={9} sx={{ display: 'flex' }}>
          {children}
        </Grid>
        <Grid item xs={3} sx={{ borderLeft: 1, p: 4, borderColor: 'divider' }}>
          <Typography variant='h4' sx={{ mb: 2 }}>
            {name || 'Pas de nom ?'}
          </Typography>
          <Typography>Commentaires:</Typography>
          <Divider sx={{ my: 2 }} />
          <TextField
            minRows={4}
            multiline
            fullWidth
            value={comment}
            onChange={onCommentChange}
            sx={{ ...(checked ? { '& textarea': { color: 'red' } } : {}) }}
          />
          <FormControlLabel control={<Checkbox onChange={handleCheck} />} label='Important' sx={{ mb: 2 }} />
          {info && <Alert severity='info'>{info}</Alert>}
        </Grid>
      </Grid>
    </Box>
  );
};

Slide.propTypes = {
  children: PropTypes.any,
  name: PropTypes.any,
  comment: PropTypes.any,
  info: PropTypes.any,
  onCommentChange: PropTypes.any,
  sx: PropTypes.any
};

export default function StepSummary() {
  const store = useStore();

  const comments = store.getAllComments();
  const snaps = store.getSnaps();

  // const { analytic, snapshots, defaultTargets } = form;

  const handleChangeComment = (pageName) => (event) => {
    store.setComment(pageName, event.target.value);
  };

  // if (isEmpty(analytic) || isEmpty(snaps)) {
  if (isEmpty(snaps)) {
    return null;
  }

  return (
    <Box display='flex' flexDirection='column' height='100%' width='100%' p={2}>
      <Stack spacing={3}>
        {/*
          <Slide name='Bilan' comment={comments.quantitative} onCommentChange={handleChangeComment('quantitative')}>
            <StepSummaryQuantitative
              useSolarEdge={store.getUserDatas('useSolarEdge')}
              analytic={analytic}
              defaultTargets={defaultTargets}
              sx={{
                m: 'auto'
              }}
            />
          </Slide>
        */}

        {Object.entries(snaps).map(([key, item]) => (
          <Slide key={key} name={item.name} comment={comments[key]} onCommentChange={handleChangeComment(key)}>
            <Box sx={{ aspectRatio: `${item.aspectRatio}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt='lol' style={{ width: '100%' }} src={item.snap} />
            </Box>
          </Slide>
        ))}
      </Stack>
    </Box>
  );
}
