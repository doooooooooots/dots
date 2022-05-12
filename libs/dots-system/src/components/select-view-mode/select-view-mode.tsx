import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { MenuItem, Select } from '@mui/material';
import { VIEW_MODES } from '@dots.cool/tokens';
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
    <Select value={viewMode} onChange={handleChange}>
      {VIEW_MODES.map((mode) => (
        <MenuItem key={mode} value={mode}>
          {mode}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectViewMode;
