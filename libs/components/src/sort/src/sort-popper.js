import { Button, Divider, Stack, Typography } from '@mui/material';
import SortField from './sort-field';
import Sortable from './sortable';

const SortPopper = (props) => {
  const { sort, onChange, onClose } = props;

  const handleSortOrderChange = (newListOrder) => {
    onChange(newListOrder);
  };

  return (
    <Stack p={2} minWidth={300}>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="span" variant="h6" textAlign="center">
          Sort
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="text">
            Réinitialiser
          </Button>
          <Button size="small" variant="contained" onClick={onClose}>
            Fermer
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Sortable
        list={sort}
        SortItemComponent={SortField}
        onSortOrderChange={handleSortOrderChange}
      />
    </Stack>
  );
};

export default SortPopper;
