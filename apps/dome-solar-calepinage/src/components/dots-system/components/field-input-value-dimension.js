import React from 'react';
import Tag from './tag';

function FieldInputValueDimension(props) {
  const { value } = props;
  return <Tag startIcon="m">{value}</Tag>;
}

FieldInputValueDimension.bindProp = ({ value }) => ({
  value,
});

export default FieldInputValueDimension;
