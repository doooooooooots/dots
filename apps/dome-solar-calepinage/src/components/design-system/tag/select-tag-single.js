import { Stack } from '@mui/material';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import { isEmpty } from 'lodash';
import ColorDot from '../icons/color-dot/color-dot';
import TagIcon from './icon';
import SelectItemOption from '../../dots-system/components/list-item/list-item-option';
import ItemTag from './item';
import { labels } from './labels';
import withDefaultValues from '../../../hoc/with-default-values';
import SelectWithAutocomplete from '../select-with-autocomplete/select-with-autocomplete';

const SelectTag = withDefaultValues(SelectWithAutocomplete, {
  title: 'Appliquer un tag',
  placeholder: 'Chercher un tag',
  startIcon: DiscountOutlinedIcon,
  options: labels,
  getOptionLabel: (option) => option.name,
  renderOption: (props, option, { selected }) => (
    <SelectItemOption
      {...props}
      title={option.name}
      icon={<TagIcon color={option.color} />}
      description={option.description}
      selected={selected}
      tooltip={option.description}
    />
  ),
  renderButtonText: (value) =>
    isEmpty(value) ? (
      'Tag'
    ) : (
      <ColorDot key={value.name} color={value.color} borderSize={1} />
    ),
  renderButtonTooltip: (value) =>
    isEmpty(value) ? (
      'Add a tag'
    ) : (
      <Stack py="4px" spacing={'3px'}>
        <ItemTag key={value.name} name={value.name} color={value.color} />
      </Stack>
    ),
});

export default SelectTag;
