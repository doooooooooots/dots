import { useDots } from '@dots.cool/schema';
import { Typography } from '@mui/material';

// [ ](Adrien): Use entity getter
function FieldInputValueRelationship(props) {
  const { name, options, value } = props;

  console.log(options);
  const { getSchema } = useDots();
  const res = getSchema(options);

  return <Typography variant="caption">{`${name}: ${value}`}</Typography>;
}

FieldInputValueRelationship.bindProp = ({ name, options, value, getter }) => ({
  name,
  options,
  value,
  getter,
});

export default FieldInputValueRelationship;
