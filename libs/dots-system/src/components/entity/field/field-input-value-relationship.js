import { useDots } from '@dots.cool/schema';
import { Typography } from '@mui/material';
import { isArray, isEmpty, isObject } from 'lodash';

// [ ](Adrien): Use entity getter
function FieldInputValueRelationship(props) {
  const { name, options, value } = props;

  console.log(options);
  const { getSchema } = useDots();
  const res = getSchema(options);

  let result;
  if (isArray(value)) {
    result = value
      .map((item) => item.name || item.givenName || item.id)
      .join(', ');
  } else if (isObject(value)) {
    result = value.name || value.givenName || value.id;
  } else result = value;

  if (isEmpty(result) || result === false || result === 'false') result = '-';

  return <Typography variant="caption">{result}</Typography>;
}

FieldInputValueRelationship.bindProp = ({ name, options, value, getter }) => ({
  name,
  options,
  value,
  getter,
});

export default FieldInputValueRelationship;
