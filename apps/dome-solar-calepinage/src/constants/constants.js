export const TOPBAR_SIZE = 5;
export const TOOLBAR_WIDTH = 35;
export const SIDEBAR_WIDTH = 280;

export const POPPER_SEARCH_PADDING = 2;

/**
 * ALIGNMENTS
 */
const LEFT = 'left';
const CENTER = 'center';
const RIGHT = 'right';
const TOP = 'top';
const MIDDLE = 'middle';
const BOTTOM = 'bottom';

export const PAGE_SOLAR_MODULE = 'solarModule';
export const PAGE_PROJECT = 'project';
export const PAGE_PRODUCT = 'product';
export const PAGE_CLADDING = 'cladding';
export const PAGE_ROOF = 'roof';
export const PAGE_LAYOUT = 'layout';

export const HORIZONTAL_ALIGNMENTS = [LEFT, CENTER, RIGHT];
export const VERTICAL_ALIGNMENTS = [TOP, MIDDLE, BOTTOM];

export const ALIGNMENTS = VERTICAL_ALIGNMENTS.reduce(
  (acc, item) => ({ ...acc, [item]: HORIZONTAL_ALIGNMENTS }),
  {}
);
