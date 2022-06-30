import { MenuItem, Select } from '@mui/material';
import { VIEW_MODES, VIEW_MODE_LABELS } from '@dots.cool/tokens';
import { useCallback } from 'react';

function SelectViewMode(props) {
  const { viewMode, onViewModeChange } = props;

  const handleChange = useCallback(
    (event) => {
      onViewModeChange(event.target.value);
    },
    [onViewModeChange]
  );

  return (
    <Select
      value={viewMode}
      onChange={handleChange}
      size="small"
      sx={{ fontSize: 14 }}
    >
      {Object.values(VIEW_MODES).map((mode) => (
        <MenuItem key={mode} value={mode}>
          {VIEW_MODE_LABELS[mode]}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectViewMode;
