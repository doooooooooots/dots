import { useState } from 'react';
import { Box } from '@mui/system';
import {
  Alert,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const slideProps = {
  height: 'calc(100vh - 120px)',
  overflow: 'hidden',
  border: 1,
  p: 3,
};

const ViewSummarySlide = (props) => {
  const { name, comment, onCommentChange, children, info, sx = {} } = props;
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };

  if (!children) return null;

  return (
    <Box sx={{ ...slideProps, ...sx }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={9} sx={{ display: 'flex', alignItems: 'center' }}>
          {children}
        </Grid>

        <Grid item xs={3} sx={{ borderLeft: 1, p: 4, borderColor: 'divider' }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
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
          <FormControlLabel
            control={<Checkbox onChange={handleCheck} />}
            label="Important"
            sx={{ mb: 2 }}
          />
          {info && <Alert severity="info">{info}</Alert>}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewSummarySlide;
