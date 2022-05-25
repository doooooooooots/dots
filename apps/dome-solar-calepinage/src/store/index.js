import compose from '../utils/compose';
import withApp from './app';
import withKeyboard from './keyboard';
import withDialog from './dialog';
import withUserDatas from './user-datas';
import { withRender } from './render';
import { withModules } from './modules';
import { withObstacles } from './obstacles';
import withSelection from './selection';
import { withSnaps } from './snaps';
import { withComments } from './comments';
import { withMediaObjects } from './media-object';
import withUtils from './utils';
import withPreview from './preview';
import withRelatedData from './related-data';
import withAnalytics from './analytics';
import { SIDEBAR_WIDTH, TOOLBAR_WIDTH } from '../constants';

export const config = {
  debounceTime: 500,
  //Snapshot
  snapTime: 300,
  snapSize: {
    x: 850,
    y: 490,
  },
  // Canvas
  topBarHeight: 40,
  formTopBarHeight: 0,
  mainMenuWidth: 0,
  drawerWidth: SIDEBAR_WIDTH,
  toolbarWidth: TOOLBAR_WIDTH,
  // Markup
  markupPadding: { x: 90, y: 60 },
  markupSize: { x: 15, y: 15 },
  // Product
  pigeZ: 100,
  railBottomOffset: 85,
  railMiddleOffset: 50,
  railOffset: 200,
};

const createStore = () =>
  compose(
    withPreview,
    withAnalytics,
    withMediaObjects,
    withComments,
    withSnaps,
    withSelection,
    withObstacles,
    withModules,
    withRender,
    withRelatedData,
    withUserDatas,
    withKeyboard,
    withUtils,
    withDialog,
    withApp
  )(config);

export default createStore;
