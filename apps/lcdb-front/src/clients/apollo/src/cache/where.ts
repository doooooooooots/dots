import { makeVar } from '@apollo/client';

const initialState = {
  operator: 'and',
  filters: [],
  byId: {},
};

const whereVar = makeVar(initialState);

export default whereVar;
