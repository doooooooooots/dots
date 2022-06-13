import { Stack, Typography } from '@mui/material';

const SelectItemOptionTooltipCard = (props) => {
  const { name, icon, description } = props;
  return (
    <Stack spacing={1} p={1}>
      <Typography variant="body2">{description}</Typography>
    </Stack>
  );
};

export default SelectItemOptionTooltipCard;
