import * as React from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import MemoizedToggleSellerType from '@components/ToggleSellerType';
import ToggleSellerCountry from '@components/ToggleSellerCoutry';
import ConnectedToggleCondition from '@components/ConnectedToggleCondition';
import ToggleLanguage from '@components/ToggleLanguage';
import ToggleAbberation from '@components/ToggleAbberation';
import ButtonFilterReset from '@components/ButtonFilterReset';
import ToggleCardAssistant from '@components/ToggleCardAssistant';
import ToggleIsFirstEdConnected from './toggle-is-first-ed-connected';

const dividerProps = {
  flexItem: true,
  orientation: 'vertical',
  sx: { mx: 0.5, my: 1 }
};

export default function ArticleFilterBar(props) {
  const {
    hideSellerType,
    hideSellerCountry,
    hideLanguage,
    hideIsFirstEd,
    hideCondition,
    hideAbbertation,
    withAssistant
  } = props;

  return (
    <Stack
      direction='row'
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`
      }}
    >
      <Stack direction='row'>
        <ButtonFilterReset />
        <Divider {...dividerProps} />
        {!hideSellerType && (
          <>
            <MemoizedToggleSellerType />
            <Divider {...dividerProps} />
          </>
        )}
        {!hideCondition && (
          <>
            <ConnectedToggleCondition />
            <Divider {...dividerProps} />
          </>
        )}
        {!hideLanguage && (
          <>
            <ToggleLanguage />
            <Divider {...dividerProps} />
          </>
        )}
        {!hideIsFirstEd && (
          <>
            <ToggleIsFirstEdConnected />
            <Divider {...dividerProps} />
          </>
        )}

        {!hideAbbertation && (
          <>
            <ToggleAbberation />
            <Divider {...dividerProps} />
          </>
        )}

        {!hideSellerCountry && (
          <>
            <ToggleSellerCountry />
            <Divider {...dividerProps} />
          </>
        )}
      </Stack>
      {withAssistant && <ToggleCardAssistant />}
    </Stack>
  );
}
