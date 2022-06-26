import lengthX from './length-x';
import lengthY from './length-y';
import { toSentenceCase } from 'js-convert-case';

export type Labels2D = { x: string; y: string };
export type TwoDLabelsType = string | Labels2D;

const dimension2D = (name: string, labels?: TwoDLabelsType) => {
  let _labels = labels;
  if (typeof _labels === 'undefined') _labels = toSentenceCase(name);
  if (typeof _labels === 'string') {
    _labels = { x: _labels, y: _labels };
  }
  return {
    [`${name}X`]: lengthX(_labels.x || `${name}X`),
    [`${name}Y`]: lengthY(_labels.y || `${name}X`),
  };
};

export default dimension2D;
