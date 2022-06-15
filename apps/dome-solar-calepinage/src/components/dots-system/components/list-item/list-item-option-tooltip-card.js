import { Stack, Typography } from '@mui/material';

const SelectItemOptionTooltipCard = (props) => {
  const { name, icon, description } = props;
  return (
    <Stack spacing={1} p={1}>
      <Typography variant="body2">{description}</Typography>
    </Stack>
  );
};

SelectItemOptionTooltipCard.bindProps = (getters, option, state) => ({
  Icon: getters.avatar(option),
  title: getters.primary(option),
  description: getters.secondary(option),
  tooltip: getters.info(option),
  selected: state.selected,
});

export default SelectItemOptionTooltipCard;
