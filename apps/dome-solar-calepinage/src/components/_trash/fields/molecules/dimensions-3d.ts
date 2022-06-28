import dimension2D, { Labels2D } from './dimensions-2d';
import lengthZ from './length-z';
import { toSentenceCase } from 'js-convert-case';

type ThreeDLabelsType =
  | string
  | (Labels2D & {
      z: string;
    });

const dimension3D = (name: string, labels?: ThreeDLabelsType) => {
  let _labels = labels;
  if (typeof _labels === 'undefined') _labels = toSentenceCase(name);
  if (typeof _labels === 'string') {
    _labels = { x: _labels, y: _labels, z: _labels };
  }

  return {
    ...dimension2D(name, _labels),
    [`${name}Z`]: lengthZ(_labels.z || `${name}Z`),
  };
};

export default dimension3D;
