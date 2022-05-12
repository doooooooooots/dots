export const CONDITIONS = [
  { value: 1, code: 'MT', name: 'Mint' },
  { value: 2, code: 'NM', name: 'Near mint' },
  { value: 3, code: 'EX', name: 'Excellent' },
  { value: 4, code: 'GD', name: 'Good' },
  { value: 5, code: 'LP', name: 'Light played' },
  { value: 6, code: 'PL', name: 'Played' },
  { value: 7, code: 'PO', name: 'Poor' }
];

export const CONDITIONS_BY_CODE = CONDITIONS.reduce((acc, condition) => {
  acc[condition.code] = condition;
  return acc;
}, {});
