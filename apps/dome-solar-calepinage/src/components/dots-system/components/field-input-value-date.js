import React from 'react';
import FieldInputValueBase from './field-input-value-base';
import { Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/fr';

function FieldInputValueDate(props) {
  const { value, ...other } = props;
  return (
    <FieldInputValueBase {...other}>
      <Typography variant="inherit">
        {`${moment(value).format('ddd DD MMMM')}`}
      </Typography>
      <Typography ml={1} variant="caption">{`(${moment(
        value
      ).fromNow()})`}</Typography>
    </FieldInputValueBase>
  );
}

export default FieldInputValueDate;
