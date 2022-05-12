import { LinearProgress } from '@mui/material';
import { GridOverlay } from '@mui/x-data-grid-pro';

export default function DatagridLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}
