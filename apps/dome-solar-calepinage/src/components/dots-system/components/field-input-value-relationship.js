import React from 'react';

function FieldInputValueRelationship(props) {
  const { value } = props;

  return <>{value.map((item) => item.givenName).join(', ')}</>;
}

export default FieldInputValueRelationship;
