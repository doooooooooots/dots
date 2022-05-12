import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { IconButton, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SortField = (props) => {
  const {
    item: { id, key, value },
    currentList,
    onChange,
  } = props;

  const handleChange = (field) => (event) => {
    const current = currentList.find((_item) => _item.id === id);
    current[field] = event.target.value;
    onChange([...currentList]);
  };

  return (
    <Stack direction="row" flex={1} spacing={1}>
      <Select value={key} onChange={handleChange('key')} fullWidth>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <Select value={value} onChange={handleChange('value')} fullWidth>
        <MenuItem value={'asc'}>Ascending</MenuItem>
        <MenuItem value={'desc'}>Descending</MenuItem>
      </Select>
      <IconButton edge="end" aria-label="clear" size="small">
        <CloseSharpIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default SortField;
