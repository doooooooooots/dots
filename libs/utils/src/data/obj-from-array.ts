import { isEmpty } from 'lodash';

const objFromArray = (arr:any[], key:string = 'id'):object => {
  return isEmpty(arr)
    ? {}
    : arr.reduce((accumulator, current) => {
        accumulator[current[key]] = current;
        return accumulator;
      }, {});
};

export default objFromArray