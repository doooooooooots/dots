import React from 'react';
import { Select, StyledOption } from '../../../input';

const RuleProperty = (props) => {
  const { propertyList = [], property, onChange } = props;
  return (
    <Select
      name="property"
      value={property}
      size="small"
      onChange={onChange}
      sx={{ width: '100%' }}
    >
      {propertyList.map((_property) => (
        <StyledOption key={_property} value={_property}>
          {_property}
        </StyledOption>
      ))}
    </Select>
  );
};

export default RuleProperty;
