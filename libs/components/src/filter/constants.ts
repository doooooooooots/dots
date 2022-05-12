//DEFAULT_VALUES
export const EMPTY = '';
export const NULL = null;
export const UNDEFINED = undefined;
export const FALSE = false;

// LOGICAL OPERTATORS
export const AND = 'and';
export const OR = 'or';

// TYPES
export const CHECKBOX = 'checkbox';
export const INTEGER = 'integer';
export const JSON_TYPE = 'json';
export const FLOAT = 'float';
export const PASSWORD = 'password';
export const SELECT = 'select';
export const TEXT = 'text';
export const TIMESTAMP = 'timestamp';
export const VALUE = 'value';
export const RELATIONSHIP = 'relationship';
export const VIRTUAL = 'virtual';
export const FILE = 'file';
export const IMAGE = 'image';
export const DOCUMENT = 'document';
export const CLOUDINARYIMAGE = 'cloudinaryImage';

// OPERATORS
export const IS_EMPTY = 'is_empty';
export const IS_NOT_EMPTY = 'is_not_empty';
export const IS = 'is';
export const IS_NOT = 'is_not';
export const ONE_OF = 'one of';
export const NONE_OF = 'none of';
export const CONTAINS = 'contains';
export const NOT_CONTAINS = 'not_contains';
export const STARTS_WITH = 'starts with';
export const NOT_STARTS_WITH = 'not_starts with';
export const ENDS_WITH = 'ends with';
export const NOT_ENDS_WITH = 'not ends with';
export const EQUALS = 'equals';
export const DIFFERENT = 'different';
export const IS_BEFORE = 'if before';
export const IS_AFTER = 'is after';
export const IS_STRICLY_BEFORE = 'is stricly before';
export const IS_STRICLY_AFTER = 'is stricly after';
export const IS_ON_OR_BEFORE = 'is_on_or_before';
export const IS_ON_OR_AFTER = 'is_on_or_after';
export const GREATER_THAN = 'greater than';
export const LOWER_THAN = 'lower than';
export const GREATER_THAN_EXCLUSIVE = 'greater than (exclusive)';
export const LOWER_THAN_EXCLUSIVE = 'lower than (exclusive)';
export const BETWEEN = 'between';
export const NOT_BETWEEN = 'not_between';
export const IN = 'in';
export const NOT_IN = 'not_in';
export const IS_WITHIN = 'is_within';
export const IS_NOT_WITHIN = 'is_not_within';

// VALUES
// - Checkboxes
export const UNCHECKED = 'unchecked';
export const CHECKED = 'checked';

// - Dates
export const DEFAULT = 'default';
export const TODAY = 'today';
export const TOMORROW = 'tomorrow';
export const YESTERDAY = 'yesterday';
export const ONE_WEEK_AGO = 'one_week_ago';
export const ONE_WEEK_FROM_NOW = 'one_week_from_now';
export const ONE_MONTH_AGO = 'one_month_ago';
export const ONE_MONTH_FROM_NOW = 'one_month_from_now';
export const THE_PAST_WEEK = 'the_past_week';
export const THE_PAST_MONTH = 'the_past_month';
export const THE_PAST_YEAR = 'the_past_year';
export const THE_NEXT_WEEK = 'the_next_week';
export const THE_NEXT_MONTH = 'the_next_month';
export const THE_NEXT_YEAR = 'the_next_year';
export const CUSTOM = 'custom';

export const TIMESTAMP_TYPE_RELATIVE = 'relative';
export const TIMESTAMP_TYPE_EXACT = 'exact';

export const TIMESTAMP_RELATIVE_VALUES = {
  [DEFAULT]: [
    TODAY,
    TOMORROW,
    YESTERDAY,
    ONE_WEEK_AGO,
    ONE_WEEK_FROM_NOW,
    ONE_MONTH_AGO,
    ONE_MONTH_FROM_NOW,
    CUSTOM,
  ],
  [IS_WITHIN]: [
    THE_PAST_WEEK,
    THE_PAST_MONTH,
    THE_PAST_YEAR,
    THE_NEXT_WEEK,
    THE_NEXT_MONTH,
    THE_NEXT_YEAR,
    CUSTOM,
  ],
};

// TYPES OPERATORS
export const EMPTY_NOT_EMPTY = [IS_EMPTY, IS_NOT_EMPTY];

// -- String
export const STRING_OPERATORS = [
  IS,
  ONE_OF,
  NONE_OF,
  IS_BEFORE,
  IS_STRICLY_BEFORE,
  IS_AFTER,
  IS_STRICLY_AFTER,
  CONTAINS,
  NOT_CONTAINS,
  STARTS_WITH,
  NOT_STARTS_WITH,
  ENDS_WITH,
  NOT_ENDS_WITH,
  ...EMPTY_NOT_EMPTY,
];

// -- Numeric
export const NUMERIC_OPERATORS = [
  EQUALS,
  DIFFERENT,
  GREATER_THAN,
  LOWER_THAN,
  GREATER_THAN_EXCLUSIVE,
  LOWER_THAN_EXCLUSIVE,
  BETWEEN,
  NOT_BETWEEN,
  IN,
  NOT_IN,
  ...EMPTY_NOT_EMPTY,
];

// -- Date
export const TIMESTAMP_OPERATORS = [
  IS,
  IS_NOT,
  IS_WITHIN,
  IS_NOT_WITHIN,
  IS_ON_OR_BEFORE,
  IS_ON_OR_AFTER,
  IS_BEFORE,
  IS_AFTER,
  ...EMPTY_NOT_EMPTY,
];

// -- SELECT
export const SELECT_OPERATORS = [IS, IS_NOT, ...EMPTY_NOT_EMPTY];

// -- SELECT MULTIPLE
export const MULTI_SELECT_OPERATORS = [
  CONTAINS,
  NOT_CONTAINS,
  ...EMPTY_NOT_EMPTY,
];

// -- CHECKBOX
export const CHECKBOX_OPERATORS = [IS, IS_NOT];

// -- FILE
export const FILE_OPERATORS = [...EMPTY_NOT_EMPTY];

// -- RELASHIONSHIP
export const RELASHIONSHIP_OPERATORS = [...EMPTY_NOT_EMPTY];

export const OPERATORS = {
  [CHECKBOX]: CHECKBOX_OPERATORS,
  [INTEGER]: NUMERIC_OPERATORS,
  [FLOAT]: NUMERIC_OPERATORS,
  [JSON_TYPE]: FILE_OPERATORS,
  [SELECT]: SELECT_OPERATORS,
  [TEXT]: STRING_OPERATORS,
  [TIMESTAMP]: TIMESTAMP_OPERATORS,
  [RELATIONSHIP]: RELASHIONSHIP_OPERATORS,
  [FILE]: FILE_OPERATORS,
  [IMAGE]: FILE_OPERATORS,
  [DOCUMENT]: FILE_OPERATORS,
  [CLOUDINARYIMAGE]: FILE_OPERATORS,
};

export const DEFAULT_OPERATOR_BY_TYPE = {
  [CHECKBOX]: IS,
  [INTEGER]: EQUALS,
  [FLOAT]: EQUALS,
  [JSON_TYPE]: IS_NOT_EMPTY,
  [PASSWORD]: IS_NOT_EMPTY,
  [SELECT]: IS,
  [TEXT]: CONTAINS,
  [TIMESTAMP]: IS,
  [RELATIONSHIP]: IS_NOT_EMPTY,
  [VIRTUAL]: IS_NOT_EMPTY,
  [FILE]: IS_NOT_EMPTY,
  [IMAGE]: IS_NOT_EMPTY,
  [DOCUMENT]: IS_NOT_EMPTY,
  [CLOUDINARYIMAGE]: IS_NOT_EMPTY,
};

export const DEFAULT_VALUE_BY_TYPE = {
  [CHECKBOX]: CHECKED,
  [INTEGER]: NULL,
  [FLOAT]: NULL,
  [JSON_TYPE]: NULL,
  [PASSWORD]: NULL,
  [SELECT]: NULL,
  [TEXT]: EMPTY,
  [TIMESTAMP]: TODAY,
  [RELATIONSHIP]: NULL,
  [VIRTUAL]: NULL,
  [FILE]: NULL,
  [IMAGE]: NULL,
  [DOCUMENT]: NULL,
  [CLOUDINARYIMAGE]: NULL,
};

export const DEFAULT_VALUE_BY_TIMESTAMP_TYPE = {
  [DEFAULT]: TODAY,
  [IS_WITHIN]: THE_PAST_WEEK,
};

export const PROPERTY_TYPES = Object.keys(DEFAULT_OPERATOR_BY_TYPE);

// TODO(Adrien): Delete this part
// !Temporary
export const PROJECT_PROPERTIES = [
  {
    id: 'createdAt',
    type: 'timestamp',
  },
  {
    id: 'updatedAt',
    type: 'timestamp',
  },
  {
    id: 'name',
    type: 'text',
  },
  {
    id: 'status',
    type: 'select',
  },
  {
    id: 'areaWind',
    type: 'integer',
  },
  {
    id: 'client',
    type: 'relationship',
  },
];

export const TYPE_BY_PROPERTY_ID = PROJECT_PROPERTIES.reduce(
  (acc, item) => ({
    ...acc,
    [item.id]: item.type,
  }),
  {}
);

export const PROPERTY_IDS = PROJECT_PROPERTIES.map((item) => item.id);
