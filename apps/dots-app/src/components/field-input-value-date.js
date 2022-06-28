import React from 'react';
import { Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/fr';
import { Box } from '@mui/system';
import Tag from './tag';

function FieldInputValueDate(props) {
  const { value } = props;
  return (
    <>
      <Tag startIcon="📅">
        {`${moment(value).format('ddd')}`}
        <Box component="span" fontWeight="bold">{`${moment(value).format(
          ' DD '
        )}`}</Box>
        {`${moment(value).format('MMMM')}`}
      </Tag>

      <Typography ml={0.5} variant="caption" color="neutral.500">{`- ${moment(
        value
      ).fromNow()}`}</Typography>
    </>
  );
}

FieldInputValueDate.bindProp = ({ value }) => ({
  value,
});

export default FieldInputValueDate;
