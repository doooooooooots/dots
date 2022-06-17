import enumSchema from '../../../../src/components/dots-system/enums';
import { toCamelCase } from 'js-convert-case';
import { ucFirst } from '@dots.cool/utils';

export default function handler(req, res) {
  const { name } = req.query;
  const {
    values,
    labels = {},
    colors = {},
  } = enumSchema[ucFirst(toCamelCase(name))];
  res.status(200).json(
    Object.entries(values).map(([key, value], index) => ({
      key,
      value,
      label: labels.fr[key],
      index: index + 1,
      color: colors[key],
    }))
  );
}
