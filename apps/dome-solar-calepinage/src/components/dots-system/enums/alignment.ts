import enumList from '../utils/enum-list';

const HORIZONTAL = ['LEFT', 'CENTER', 'RIGHT'] as const;
const VERTICAL = ['TOP', 'MIDDLE', 'BOTTOM'] as const;

type HorizontalValueType = typeof HORIZONTAL[number];
type VerticalValueType = typeof VERTICAL[number];
type PositionValueType = `${VerticalValueType}_${HorizontalValueType}`;
type AlignementValueType = { [key in PositionValueType]: number };

const VALUES = VERTICAL.reduce((acc, vertical) => {
  HORIZONTAL.forEach((horizontal) => {
    acc[`${vertical}_${horizontal}`] = 1 + Object.values(acc).length;
  });
  return acc;
}, {} as AlignementValueType);

const Alignment = enumList({
  type: 'category',
  values: VALUES,
});

export default Alignment;
