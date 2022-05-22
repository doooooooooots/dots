/**
 * ALIGNMENTS
 */
const LEFT = 'left';
const CENTER = 'center';
const RIGHT = 'right';
const TOP = 'top';
const MIDDLE = 'middle';
const BOTTOM = 'bottom';

export const PAGE_SOLAR_MODULE = 'pageSolarModule';
export const PAGE_PROJECT = 'pageProject';
export const PAGE_PRODUCT = 'pageProduct';
export const PAGE_CLADDING = 'pageCladding';

export const HORIZONTAL_ALIGNMENTS = [LEFT, CENTER, RIGHT];
export const VERTICAL_ALIGNMENTS = [TOP, MIDDLE, BOTTOM];

export const ALIGNMENTS = VERTICAL_ALIGNMENTS.reduce(
  (acc, item) => ({ ...acc, [item]: HORIZONTAL_ALIGNMENTS }),
  {}
);
