import { Box } from '@mui/system';

import SignalCellularAlt1BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt1BarOutlined';
import SignalCellularAlt2BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt2BarOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';

/**
 * EMERGENCY ICON
 */

const EmergencyIcon = ({ severity, size = 'medium' }) => {
  let boxProps = { width: 24, height: 24 };
  if (size === 'small') boxProps = { width: 20, height: 20 };
  if (size === 'large') boxProps = { width: 28, height: 28 };

  return (
    <Box position="relative" {...boxProps}>
      <SignalCellularAltOutlinedIcon
        fontSize={size}
        sx={{ fill: (theme) => `${theme.palette.grey[200]}` }}
      />
      {!!severity && (
        <Box position="absolute" top={0} left={0}>
          {severity === 4 && (
            <SignalCellularAltOutlinedIcon
              fontSize={size}
              sx={{ fill: (theme) => `${theme.palette.error.main}` }}
            />
          )}
          {severity === 3 && (
            <SignalCellularAlt2BarOutlinedIcon
              fontSize={size}
              sx={{ fill: (theme) => `${theme.palette.warning.main}` }}
            />
          )}
          {severity === 2 && (
            <SignalCellularAlt1BarOutlinedIcon
              fontSize={size}
              sx={{ fill: (theme) => `${theme.palette.success.main}` }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default EmergencyIcon;
