import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { IconButton, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SortField = (props) => {
  const {
    item: { id, field, direction },
    onChange,
    sortableFields,
  } = props;

  const handleChange = (field) => (event) => {
    onChange((currentList) => {
      const current = currentList.find((_item) => _item.id === id);
      current[field] = event.target.value;
      return [...currentList];
    });
  };

  const handleDelete = () => {
    onChange((currentList) => {
      return currentList.filter((_item) => _item.id !== id);
    });
  };

  return (
    <Stack direction="row" flex={1} spacing={1}>
      <Select value={field} onChange={handleChange('field')} fullWidth>
        {sortableFields.map((fieldName) => (
          <MenuItem key={fieldName} value={fieldName}>
            {fieldName}
          </MenuItem>
        ))}
      </Select>
      <Select value={direction} onChange={handleChange('direction')} fullWidth>
        <MenuItem value={'asc'}>Ascending</MenuItem>
        <MenuItem value={'desc'}>Descending</MenuItem>
      </Select>
      <IconButton
        edge="end"
        aria-label="clear"
        size="small"
        onClick={handleDelete}
      >
        <CloseSharpIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default SortField;
