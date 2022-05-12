import { getLanguageId } from '@utils/get-language';
import { Typography, Stack, Switch, Checkbox } from '@mui/material';
import ConfirmMove from 'src/design-system/modals/confirm-modal-move-multiple';
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import ToggleCondition from '@components/toggle-condition';
import ToggleLanguage from '@components/toggle-language';

const UPDATE_MULTIPLE_STOCK_UNITS = gql`
  mutation MoveMultipleStockUnits($data: [StockUnitUpdateArgs!]!) {
    updateStockUnits(where: $where) {
      id
    }
  }
`;

function ModalUpdateMultiple(props) {
  const { target, onClose, onSubmitCallback } = props;

  // *MUTATION
  const [updateMultipleStockUnit] = useMutation(UPDATE_MULTIPLE_STOCK_UNITS);

  const [settings, setSettings] = useState({
    condition: 'NM',
    language: 'fr',
    isFirstEd: false,
    confirmMessage: '',
    checked: {
      condition: false,
      language: false,
      isFirstEd: false
    }
  });

  const handleSwitch = React.useCallback((event) => {
    setSettings((current) => ({
      ...current,
      checked: {
        ...current.checked,
        [event.target.name]: event.target.checked
      }
    }));
  }, []);

  const handleCheckbox = React.useCallback((event) => {
    setSettings((current) => ({
      ...current,
      [event.target.name]: event.target.checked
    }));
  }, []);

  const handleChange = React.useCallback((event, newValue) => {
    if (!event.target.value && !newValue) {
      return;
    }
    setSettings((current) => ({
      ...current,
      [event.target.name]: newValue || event.target.value
    }));
  }, []);

  // *FUNC -- OnSubmit
  const handleSubmitClick = () => {
    const languageId = getLanguageId(settings.language);
    updateMultipleStockUnit({
      ids: target,
      attributes: {
        ...(settings.checked.condition ? { condition: settings.condition } : {}),
        ...(settings.checked.language ? { languageId } : {}),
        ...(settings.checked.isFirstEd ? { isFirstEd: settings.isFirstEd } : {})
      }
    });
  };

  return (
    <ConfirmMove target={target} onCancel={onClose} onSubmit={handleSubmitClick} onSubmitCallback={onSubmitCallback}>
      <Stack
        spacing={2}
        sx={{
          '& > div': { alignItems: 'center' },
          '& > div > h5': { width: 150, textAlign: 'left' }
        }}
      >
        <Stack direction='row' spacing={2}>
          <Typography variant='h5'>Condition</Typography>
          <Switch
            name='condition'
            inputProps={{ 'aria-label': 'Switch condition' }}
            checked={settings.checked.condition}
            onChange={handleSwitch}
          />
          {settings.checked.condition && <ToggleCondition condition={settings.condition} onChange={handleChange} />}
        </Stack>

        <Stack direction='row' spacing={2}>
          <Typography variant='h5'>Langue</Typography>
          <Switch
            name='language'
            inputProps={{ 'aria-label': 'Switch language' }}
            checked={settings.checked.language}
            onChange={handleSwitch}
          />
          {settings.checked.language && <ToggleLanguage language={settings.language} onChange={handleChange} />}
        </Stack>

        <Stack direction='row' spacing={2}>
          <Typography variant='h5'>is First ?</Typography>
          <Switch
            name='isFirstEd'
            inputProps={{ 'aria-label': 'Switch isFirstEd' }}
            checked={settings.checked.isFirstEd}
            onChange={handleSwitch}
          />
          {settings.checked.isFirstEd && (
            <Checkbox name='isFirstEd' checked={settings.isFirstEd} onChange={handleCheckbox} />
          )}
        </Stack>
      </Stack>
    </ConfirmMove>
  );
}

export default ModalUpdateMultiple;
