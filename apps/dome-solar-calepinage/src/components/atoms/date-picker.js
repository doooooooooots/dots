import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Box } from '@mui/system';

export default function StaticDatePickerLandscape(props) {
  return (
    <Box
      sx={{
        maxWidth: 520,
        margin: 'auto',
        '& .MuiPickersToolbar-penIconButton': {
          visibility: 'hidden',
        },
        '& .MuiDatePickerToolbar-root .MuiTypography-overline': {
          color: '#ffffff',
          backgroundColor: 'black',
          padding: '0px 16px',
          borderRadius: '8px',
        },
      }}
    >
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        mask={'__/__/____'}
        toolbarFormat={`EEEE dd MMM`}
        shouldDisableDate={isWeekend}
        renderInput={(params) => <TextField {...params} />}
        {...props}
      />
    </Box>
  );
}
