import enumSchema from '../../../../src/components/dots-system/enums';
import { toCamelCase } from 'js-convert-case';
import { ucFirst } from '@dots.cool/utils';

export default function handler(req, res) {
  const { name } = req.query;
  const EnmumName = ucFirst(toCamelCase(name));

  if (!(EnmumName in enumSchema)) {
    res.status(400).json({
      status: 400,
      message: `Bad Request: ${name} does not exist on enum list`,
    });
    return;
  }

  const Enum = enumSchema[EnmumName];

  res.status(200).json({
    options: Enum.getOptions(),
    min: Enum.getMinValue(),
    max: Enum.getMaxValue(),
    length: Enum.getOptionsLength(),
    type: Enum.type,
  });
}
