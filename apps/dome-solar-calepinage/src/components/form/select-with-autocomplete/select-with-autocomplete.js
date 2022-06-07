import AutocompleteButton from './components/autocomplete-button';
import { ProvideAutocomplete, useAutocomplete } from './hooks/use-autocomplete';
import PopperFromList from './components/popper-from-list';
import PopperFromQuery from './components/popper-from-query';
import { useMemo } from 'react';
import { ucFirst } from '@dots.cool/utils';
import { Box } from '@mui/system';
import { isEmpty } from 'lodash';
import AddIcon from '@mui/icons-material/Add';

const formattedIcon = (icon) => {
  if (!icon) return null;
  if (['number', 'string'].includes(typeof icon)) return <Box>{icon}</Box>;
  if (typeof icon === 'object') {
    let Icon = icon;
    return <Icon />;
  }
  return icon;
};

const SelectWithAutocomplete = (props) => {
  let { multiple, defaultValue } = props;

  if (typeof defaultValue === 'undefined') {
    defaultValue = multiple ? [] : null;
  }

  return (
    <ProvideAutocomplete config={{ multiple, defaultValue }}>
      <SelectWithContext {...props} />
    </ProvideAutocomplete>
  );
};

const SelectWithContext = (props) => {
  const {
    multiple,
    //Button
    variant = 'outlined',
    color = 'neutral',
    startIcon = null,
    endIcon = null,
    placement = 'bottom',
    followCursor,
    hideAddIcon,
    withCount,
    renderButtonText = () => 'Add',
    renderButtonTooltip = () => 'Click to add',
    // Popper
    title = '',
    placeholder = '',
    renderOption = (option) => option,
    getOptionLabel = (option) => option,
    filterAttributes,
    hideSearch,
    //-> options from Apollo request
    query,
    take = 5,
    skip = 0,
    where = {},
    //-> options is constant enum
    options,
    filter = null,
    // -- end of option
  } = props;

  const { value, onButtonClick, open } = useAutocomplete();

  const buttonText = useMemo(() => {
    const _buttonText = renderButtonText(value);
    if (typeof _buttonText === 'string')
      return ucFirst(_buttonText.toLowerCase());
    return _buttonText;
  }, [renderButtonText, value]);

  const IconStart = formattedIcon(startIcon);
  const IconEnd = multiple && withCount ? value.length : formattedIcon(endIcon);
  const tooltipTitle = renderButtonTooltip(value);

  return (
    <>
      <AutocompleteButton
        variant={variant}
        color={color}
        onClick={onButtonClick}
        startIcon={
          !isEmpty(value) || (isEmpty(value) && hideAddIcon) ? (
            IconStart
          ) : (
            <AddIcon />
          )
        }
        endIcon={IconEnd}
        isActive={open}
        title={tooltipTitle}
        placement={placement}
        followCursor={followCursor}
      >
        {buttonText}
      </AutocompleteButton>

      {open && (
        <>
          {query ? (
            <PopperFromQuery
              title={title}
              query={query}
              take={take}
              skip={skip}
              where={where}
              getOptionLabel={getOptionLabel}
              filterAttributes={filterAttributes}
              renderOption={renderOption}
              inputProps={{ placeholder }}
              hideSearch={hideSearch}
              multiple={multiple}
            />
          ) : (
            <PopperFromList
              title={title}
              options={options}
              count={options.length}
              filter={filter}
              getOptionLabel={getOptionLabel}
              renderOption={renderOption}
              inputProps={{ placeholder }}
              hideSearch={hideSearch}
              multiple={multiple}
            />
          )}
        </>
      )}
    </>
  );
};

export default SelectWithAutocomplete;
