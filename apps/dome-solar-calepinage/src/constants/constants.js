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

export const HORIZONTAL_ALIGNMENTS = [LEFT, CENTER, RIGHT];
export const VERTICAL_ALIGNMENTS = [TOP, MIDDLE, BOTTOM];

export const ALIGNMENTS = VERTICAL_ALIGNMENTS.reduce(
  (acc, item) => ({ ...acc, [item]: HORIZONTAL_ALIGNMENTS }),
  {}
);

/**
 ** PROJECT_STEPS
 */
export const STEP_PRE_STUDY_TODO = 'step_study_todo';
export const STEP_PRE_STUDY_DONE = 'step_study_done';
export const STEP_PRE_STUDY_SENT = 'step_study_sent';
export const STEP_CF_TODO = 'step_cf_todo';
export const STEP_CF_SENT = 'step_cf_sent';
export const STEP_CF_APPROVED = 'step_cf_approved';

export const PROJECT_STEP_OPTIONS = [
  STEP_PRE_STUDY_TODO,
  STEP_PRE_STUDY_DONE,
  STEP_PRE_STUDY_SENT,
  STEP_CF_TODO,
  STEP_CF_SENT,
  STEP_CF_APPROVED,
];
export const PROJECT_STEP_LABELS = {
  [STEP_PRE_STUDY_TODO]: 'Pre-étude à faire',
  [STEP_PRE_STUDY_DONE]: 'Pre-étude faite',
  [STEP_PRE_STUDY_SENT]: 'Pre-étude envoyée',
  [STEP_CF_TODO]: 'cf à faire',
  [STEP_CF_SENT]: 'cf envoyé',
  [STEP_CF_APPROVED]: 'cf approuvé',
};

/**
 ** STATUS
 */
export const STATUS_DRAFT = 'status_draft';
export const STATUS_AVAILABLE = 'status_available';
export const STATUS_ARCHIVED = 'status_archived';
export const STATUS_UNPUBLISHED = 'status_unpublished';

export const STATUS_OPTIONS = [
  STATUS_DRAFT,
  STATUS_AVAILABLE,
  STATUS_ARCHIVED,
  STATUS_UNPUBLISHED,
];

/**
 ** PURLIN TYPES
 */
export const PURLIN_TYPE_PAF = 'PAF';
export const PURLIN_TYPE_LAC = 'LAC';
export const PURLIN_TYPE_BOIS = 'BOIS';

export const PURLIN_TYPES_OPTIONS = [
  PURLIN_TYPE_PAF,
  PURLIN_TYPE_LAC,
  PURLIN_TYPE_BOIS,
];

/**
 ** AREA WIND
 */
export const AREA_WIND_LOW = 'area-wind_low';
export const AREA_WIND_MODERATE = 'area-wind_moderate';
export const AREA_WIND_CONSIDERABLE = 'area-wind_considerable';
export const AREA_WIND_HIGH = 'area-wind_high';

export const AREA_WIND_VALUES = {
  [AREA_WIND_LOW]: 1,
  [AREA_WIND_MODERATE]: 2,
  [AREA_WIND_CONSIDERABLE]: 3,
  [AREA_WIND_HIGH]: 4,
};

export const AREA_WIND_MIN = AREA_WIND_LOW;
export const AREA_WIND_MAX = AREA_WIND_HIGH;

export const AREA_WIND_MIN_VALUE = AREA_WIND_VALUES[AREA_WIND_MIN];
export const AREA_WIND_MAX_VALUE = AREA_WIND_VALUES[AREA_WIND_MAX];

/**
 ** AREA SNOW
 */
export const AREA_SNOW_A1 = 'area-snow_a1';
export const AREA_SNOW_A2 = 'area-snow_a2';
export const AREA_SNOW_B1 = 'area-snow_b1';
export const AREA_SNOW_B2 = 'area-snow_b2';
export const AREA_SNOW_C1 = 'area-snow_c1';
export const AREA_SNOW_C2 = 'area-snow_c2';
export const AREA_SNOW_D = 'area-snow_d';
export const AREA_SNOW_E = 'area-snow_e';

export const AREA_SNOW_VALUES = {
  [AREA_SNOW_A1]: 1,
  [AREA_SNOW_A2]: 2,
  [AREA_SNOW_B1]: 3,
  [AREA_SNOW_B2]: 4,
  [AREA_SNOW_C1]: 5,
  [AREA_SNOW_C2]: 6,
  [AREA_SNOW_D]: 7,
  [AREA_SNOW_E]: 8,
};

export const AREA_SNOW_MIN = AREA_SNOW_A1;
export const AREA_SNOW_MAX = AREA_SNOW_E;

export const AREA_SNOW_MIN_VALUE = AREA_SNOW_VALUES[AREA_SNOW_MIN];
export const AREA_SNOW_MAX_VALUE = AREA_SNOW_VALUES[AREA_SNOW_MAX];

export const AREA_SNOW_LABELS_FR = {
  [AREA_SNOW_A1]: 'A1',
  [AREA_SNOW_A2]: 'A2',
  [AREA_SNOW_B1]: 'B1',
  [AREA_SNOW_B2]: 'B2',
  [AREA_SNOW_C1]: 'C1',
  [AREA_SNOW_C2]: 'C2',
  [AREA_SNOW_D]: 'D',
  [AREA_SNOW_E]: 'E',
};

/**
 ** AREA SEA
 */
export const AREA_SEA_CLOSE = 'area-sea_close';
export const AREA_SEA_MEDIUM = 'area-sea_medium';
export const AREA_SEA_DISTANT = 'area-sea_distant';

export const AREA_SEA_VALUES = {
  [AREA_SEA_CLOSE]: 0,
  [AREA_SEA_MEDIUM]: 1,
  [AREA_SEA_DISTANT]: 2,
};

export const AREA_SEA_MIN = AREA_SEA_CLOSE;
export const AREA_SEA_MAX = AREA_SEA_DISTANT;

export const AREA_SEA_MIN_VALUE = AREA_SEA_VALUES[AREA_SEA_MIN];
export const AREA_SEA_MAX_VALUE = AREA_SEA_VALUES[AREA_SEA_MAX];

export const AREA_SEA_LABELS_FR = {
  [AREA_SEA_CLOSE]: 'Moins de 2 km',
  [AREA_SEA_MEDIUM]: 'Entre 2 et 3 km',
  [AREA_SEA_DISTANT]: 'Plus de 3km',
};

/**
 ** AREA FIELD
 */
export const AREA_FIELD_SEA = 'area-field_sea';
export const AREA_FIELD_OPEN_COUNTRY = 'area-field_open-country';
export const AREA_FIELD_CAMPAIGN = 'area-field_campaign';
export const AREA_FIELD_URBAN = 'area-field_urban';
export const AREA_FIELD_URBAN_LIGHT = 'area-field_urban-light';

export const AREA_FIELD_OPTIONS = [
  AREA_FIELD_SEA,
  AREA_FIELD_OPEN_COUNTRY,
  AREA_FIELD_CAMPAIGN,
  AREA_FIELD_URBAN,
  AREA_FIELD_URBAN_LIGHT,
];

export const AREA_FIELD_VALUES = {
  [AREA_FIELD_SEA]: 1,
  [AREA_FIELD_OPEN_COUNTRY]: 2,
  [AREA_FIELD_CAMPAIGN]: 3,
  [AREA_FIELD_URBAN]: 4,
  [AREA_FIELD_URBAN_LIGHT]: 5,
};

export const AREA_FIELD_LABELS_FR = {
  [AREA_FIELD_SEA]:
    "Mer ou zone côtière exposée aux vents de mer: lacs et plans d'eau parcourus par le vent sur une distance d'au moins 5km",
  [AREA_FIELD_OPEN_COUNTRY]:
    'Rase campagne avec ou non quelques obstacles isolés (arbres, bâtiments, etc) séparés les uns des autres de plus de 40 fois leur hauteur',
  [AREA_FIELD_CAMPAIGN]:
    'Campagne avec haies; vignobles; bocage; habitat dispersé',
  [AREA_FIELD_URBAN]: 'Zones urbanisée ou industrielles; bocage dense; vergers',
  [AREA_FIELD_URBAN_LIGHT]:
    'Zones urbaines dont moins 15% de la surface sont recouverts de bâtiments dont la hauteur moyenne est supérieure à 15m; forêts',
};

export const AREA_FIELD_MIN = AREA_FIELD_SEA;
export const AREA_FIELD_MAX = AREA_FIELD_URBAN_LIGHT;

export const AREA_FIELD_MIN_VALUE = AREA_FIELD_VALUES[AREA_FIELD_MIN];
export const AREA_FIELD_MAX_VALUE = AREA_FIELD_VALUES[AREA_FIELD_MAX];

/**
 ** FRAME TYPE
 */
export const FRAME_TYPE_NATURAL = 'frame-type_natural';
export const FRAME_TYPE_BLACK = 'frame-type_open-black';
export const FRAME_TYPE_ROLLED = 'frame-type_rolled';

export const FRAME_TYPE_VALUES = {
  [FRAME_TYPE_NATURAL]: 0,
  [FRAME_TYPE_BLACK]: 1,
  [FRAME_TYPE_ROLLED]: 2,
};

export const FRAME_TYPE_LABELS_FR = {
  [FRAME_TYPE_NATURAL]: 'Aluminium naturel',
  [FRAME_TYPE_BLACK]: 'Aluminium noir',
  [FRAME_TYPE_ROLLED]: 'Laminé',
};

export const FRAME_TYPE_MIN = FRAME_TYPE_NATURAL;
export const FRAME_TYPE_MAX = FRAME_TYPE_ROLLED;

export const FRAME_TYPE_MIN_VALUE = FRAME_TYPE_VALUES[FRAME_TYPE_MIN];
export const FRAME_TYPE_MAX_VALUE = FRAME_TYPE_VALUES[FRAME_TYPE_MAX];
