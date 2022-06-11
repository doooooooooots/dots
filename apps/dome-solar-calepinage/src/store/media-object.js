import { last } from 'lodash';
import cyrb53 from '../utils/cryb-53';

const withMediaObjects = (app) => ({
  ...app,

  allMedias: [],

  addMediaObjectVersion() {
    this.allMedias.push({ name: `${cyrb53(Math.random())}.pdf` });
  },
  allMediaObjectVersion() {
    return this.allMedias;
  },
  lastMediaObjectVersion() {
    return last(this.allMedias);
  },
});

export default withMediaObjects;
