import { isEmpty } from 'lodash';

const arrayFromObject = (obj) => {
  return isEmpty(obj) ? [] : obj.allIds.map((id) => obj.byId[id]);
};

export default arrayFromObject;