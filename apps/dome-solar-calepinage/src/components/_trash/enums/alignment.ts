import { toSentenceCase } from 'js-convert-case';
import enumList from '../../dots-system/utils/enum-list';

const VERTICAL = ['TOP', 'MIDDLE', 'BOTTOM'] as const;
type VerticalValueType = typeof VERTICAL[number];

const HORIZONTAL = ['LEFT', 'CENTER', 'RIGHT'] as const;
type HorizontalValueType = typeof HORIZONTAL[number];

export type PositionValueType = `${VerticalValueType}_${HorizontalValueType}`;

const concatPosition = (
  v: VerticalValueType,
  h: HorizontalValueType
): PositionValueType => `${v}_${h}`;

type AlignementValueType = { [key in PositionValueType]: number };

export const ALIGNMENTS = VERTICAL.reduce((acc, v) => {
  HORIZONTAL.forEach((h) => {
    acc[concatPosition(v, h)] = 1 + Object.values(acc).length;
  });
  return acc;
}, {} as AlignementValueType);

export const ALIGNMENT_MAP = VERTICAL.map((v) =>
  HORIZONTAL.reduce((acc, h) => [...acc, ALIGNMENTS[concatPosition(v, h)]], [])
);

const Alignment = enumList({
  type: 'category',
  values: ALIGNMENTS,
  labels: {
    fr: Object.keys(ALIGNMENTS).reduce(
      (acc, key) => ({ ...acc, [key]: toSentenceCase(key) }),
      {} as { [key in PositionValueType]: string }
    ),
  },
  helpers: {
    isTop: (value: number) =>
      [
        ALIGNMENTS.TOP_LEFT,
        ALIGNMENTS.TOP_CENTER,
        ALIGNMENTS.TOP_RIGHT,
      ].includes(value),
    isMiddle: (value: number) =>
      [
        ALIGNMENTS.MIDDLE_LEFT,
        ALIGNMENTS.MIDDLE_CENTER,
        ALIGNMENTS.MIDDLE_RIGHT,
      ].includes(value),
    isBottom: (value: number) =>
      [
        ALIGNMENTS.BOTTOM_LEFT,
        ALIGNMENTS.BOTTOM_CENTER,
        ALIGNMENTS.BOTTOM_RIGHT,
      ].includes(value),
    isLeft: (value: number) =>
      [
        ALIGNMENTS.TOP_LEFT,
        ALIGNMENTS.MIDDLE_LEFT,
        ALIGNMENTS.BOTTOM_LEFT,
      ].includes(value),
    isCenter: (value: number) =>
      [
        ALIGNMENTS.TOP_CENTER,
        ALIGNMENTS.MIDDLE_CENTER,
        ALIGNMENTS.BOTTOM_CENTER,
      ].includes(value),
    isRight: (value: number) =>
      [
        ALIGNMENTS.TOP_RIGHT,
        ALIGNMENTS.MIDDLE_RIGHT,
        ALIGNMENTS.BOTTOM_RIGHT,
      ].includes(value),
  },
});

export default Alignment;
