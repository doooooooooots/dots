import enumSchema from '../../../../src/components/dots-system/enums';
import { toCamelCase, toSnakeCase } from 'js-convert-case';
import { ucFirst } from '@dots.cool/utils';

export default function handler(req, res) {
  const { name, token } = req.query;
  const _token = toSnakeCase(token).toUpperCase();
  const { values, labels } = enumSchema[ucFirst(toCamelCase(name))];

  if (!values[_token])
    return res
      .status(400)
      .json({ status: 400, message: `${_token} does not exist on ${name}` });

  res.status(200).json({
    key: token,
    value: values[_token],
    label: labels.fr[_token],
  });
}
