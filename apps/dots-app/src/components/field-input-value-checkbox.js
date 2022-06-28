import React from 'react';
import Tag from './tag';

function FieldInputValueCheckbox(props) {
  const { value } = props;
  return <Tag>{value ? '✅' : '❌'}</Tag>;
}

FieldInputValueCheckbox.bindProp = ({ value }) => ({
  value,
});

export default FieldInputValueCheckbox;
