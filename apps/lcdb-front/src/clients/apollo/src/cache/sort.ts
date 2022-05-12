import { makeVar } from '@apollo/client';

const initialState = [
  {
    id: '1',
    key: 10,
    value: 'asc',
  },
  {
    id: '2',
    key: 20,
    value: 'desc',
  },
  {
    id: '3',
    key: 30,
    value: 'desc',
  },
];

const sortVar = makeVar(initialState);

export default sortVar;
