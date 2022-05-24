import { decomposeColor } from '@mui/material';

export default function getContrastColor(rgbColor) {
  const rgb = decomposeColor(rgbColor).values;
  const brightness = Math.round(
    (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) /
      1000
  );
  return brightness > 125 ? 'black' : 'white';
}
