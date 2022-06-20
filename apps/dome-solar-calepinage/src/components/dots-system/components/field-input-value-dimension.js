import React from 'react';
import Tag from './tag';

function FieldInputValueDimension(props) {
  const { value } = props;
  return <Tag endIcon="m">{value}</Tag>;
}

export default FieldInputValueDimension;
