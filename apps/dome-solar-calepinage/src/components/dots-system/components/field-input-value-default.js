import React from 'react';
import Tag from './tag';

function FieldInputValueDefault(props) {
  const { value } = props;

  return <Tag>{value}</Tag>;
}

export default FieldInputValueDefault;
