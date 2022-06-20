import React from 'react';
import FieldInputValueBase from './field-input-value-base';
import moment from 'moment';

function FieldInputValueDate(props) {
  const { value } = props;
  return <FieldInputValueBase>{moment(value).fromNow()}</FieldInputValueBase>;
}

export default FieldInputValueDate;
