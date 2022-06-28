import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const ColorDot = (props) => {
  const { color, size = 'medium', borderColor, borderSize, sx = {} } = props;
  const theme = useTheme();

  let sizePros = { width: 14, height: 14 };
  if (size === 'small') sizePros = { width: 8, height: 8 };
  if (size === 'large') sizePros = { width: 16, height: 16 };

  return (
    <Box
      {...sizePros}
      borderRadius="50%"
      bgcolor={color}
      sx={[
        {
          outline:
            borderSize || borderColor
              ? `${borderSize || 1}px solid ${
                  borderColor || theme.palette.background.default
                }`
              : 'none',
        },
        sx,
      ]}
    />
  );
};

export default ColorDot;
