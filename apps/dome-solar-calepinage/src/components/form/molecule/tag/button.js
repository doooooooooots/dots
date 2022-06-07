import React from 'react';
import ButtonBase from '../../atoms/button-base';
import { useAutocomplete } from '../../select-with-autocomplete/hooks/use-autocomplete';
import TagTooltip from './tooltip';

function TagButton(props) {
  const { tooltip, startIcon, endIcon, withAddIcon } = props;

  const { value, onButtonClick, open } = useAutocomplete();

  return (
    <ButtonBase
      tooltip={<TagTooltip value={value} />}
      startIcon={startIcon}
      endIcon={value.length}
      onClick={onClick}
      isActive={open}
      withAddIcon={value.length === 0}
    >
      {renderButtonText(value, tooltip)}
    </ButtonBase>
  );
}

export default TagButton;
