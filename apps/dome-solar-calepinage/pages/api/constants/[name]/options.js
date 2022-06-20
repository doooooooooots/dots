import enumSchema from '../../../../src/components/dots-system/enums';
import { toCamelCase } from 'js-convert-case';
import { ucFirst } from '@dots.cool/utils';

export default function handler(req, res) {
  const { name } = req.query;
  const Enum = enumSchema[ucFirst(toCamelCase(name))];

  res.status(200).json({
    options: Enum.getOptions(),
    min: Enum.getMinValue(),
    max: Enum.getMaxValue(),
    length: Enum.getOptionsLength(),
    type: Enum.type,
  });
}
