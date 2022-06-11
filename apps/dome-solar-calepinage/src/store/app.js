import { uniqueId, isEmpty } from 'lodash';

const withApp = (config) => ({
  config,

  app: {
    isReady: false,
    isLoading: false,
    isRendered: false,
    cacheId: uniqueId(),
    currentPage: 'layout',
    needRerender: false,
    hasConfirmedOnBoarding: false,
  },

  refs: {
    stage: null,
    canvas: null,
    selection: null,
    render: null,
  },

  /**
   * Main
   */

  init() {
    this.reloadSize();
  },
  draw() {
    this.app.cacheId = uniqueId();
  },

  /**
   * Config
   */

  getConfig() {
    return this.config;
  },
  getCurrentPage() {
    return this.app.currentPage;
  },
  setCurrentPage(page) {
    this.app.currentPage = page;
  },
  getNeedRerender() {
    return this.app.needRerender;
  },
  setNeedRerender(state) {
    this.app.needRerender = state;
  },

  /**
   * Status
   */

  isReady() {
    return this.app.isReady;
  },
  setIsReady(state) {
    this.app.isReady = state;
  },

  hasConfirmedOnBoarding() {
    return this.app.hasConfirmedOnBoarding;
  },
  sethasConfirmedOnBoarding(state) {
    this.app.hasConfirmedOnBoarding = state;
  },
  hasRequiredInfos() {
    return (
      !isEmpty(this.getRelatedData('solarModule')) &&
      !isEmpty(this.getRelatedData('product'))
    );
  },
  isLoading() {
    return this.app.isLoading;
  },
  setIsLoading(value) {
    this.app.isLoading = value;
  },

  isRendered() {
    return this.app.isRendered;
  },
  setIsRendered(state) {
    this.app.isRendered = !!state;
  },

  /**
   * Refs
   */

  setRefs(refs) {
    this.refs = refs;
  },
  getCurrentStage() {
    return this.refs.stage?.current;
  },
  getCurrentCanvas() {
    return this.refs.canvas?.current;
  },
  getCurrentRenderZone() {
    return this.refs.renderZone?.current;
  },
});

export default withApp;
