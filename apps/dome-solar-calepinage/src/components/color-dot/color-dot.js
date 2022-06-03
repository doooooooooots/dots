import { Box } from '@mui/system';

const ColorDot = (props) => {
  const { color, contrast } = props;
  return (
    <Box
      width={8}
      height={8}
      borderRadius="50%"
      bgcolor={`${color}.${contrast ? 'contrastText' : 'main'}`}
      ml={1}
    />
  );
};

export default ColorDot;
