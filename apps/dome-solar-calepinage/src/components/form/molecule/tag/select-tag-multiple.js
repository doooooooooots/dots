import { isEmpty } from 'lodash';
import ColorDotGroup from '../../../icons/color-dot/color-dot-group';
import ColorDot from '../../../icons/color-dot/color-dot';
import TagIcon from './icon';
import SelectItemOption from '../../select-with-autocomplete/components/item-option';
import { Stack } from '@mui/material';
import ItemTag from './item';
import { labels } from './labels';
import withDefaultValues from '../../../hoc/with-default-values';
import SelectWithAutocomplete from '../../select-with-autocomplete/select-with-autocomplete';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';

const SelectTag = withDefaultValues(SelectWithAutocomplete, {
  title: 'Appliquer des tags au projet',
  multiple: true,
  placeholder: 'Chercher un tag',
  startIcon: DiscountOutlinedIcon,
  withCount: true,
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
      'Tags'
    ) : (
      <ColorDotGroup>
        {value.map((label) => (
          <ColorDot key={label.name} color={label.color} borderSize={1} />
        ))}
      </ColorDotGroup>
    ),
  renderButtonTooltip: (value) =>
    isEmpty(value) ? (
      'Add a tag'
    ) : (
      <Stack py="4px" spacing={'3px'}>
        {value.map((label) => (
          <ItemTag key={label.name} name={label.name} color={label.color} />
        ))}
      </Stack>
    ),
});

export default SelectTag;
