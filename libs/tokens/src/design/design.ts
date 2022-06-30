export const VIEW_MODES = {
  List: 'view_mode_list',
  Card: 'view_mode_card',
  Table: 'view_mode_table',
  Grid: 'view_mode_grid',
} as const;

export const VIEW_MODE_LABELS = {
  [VIEW_MODES.List]: 'Liste',
  [VIEW_MODES.Card]: 'Card',
  [VIEW_MODES.Table]: 'Tableau',
  [VIEW_MODES.Grid]: 'Grid',
};

export const FORM_LABEL_SPACING = 1;

export const PAGINATION_DEFAULT_PAGE_START = 1;
export const PAGINATION_DEFAULT_TAKE = 10;
export const PAGINATION_DEFAULT_AVAILABLE_TAKES = [5, 10, 20, 50, 100];

export const FORM_MODAL_WIDTH = 'md';

export const ACTIVE = '.Mui-active';
export const CHECKED = '.Mui-checked';
export const COMPLETED = '.Mui-completed';
export const DISABLED = '.Mui-disabled';
export const ERROR = '.Mui-error';
export const EXPANDED = '.Mui-expanded';
export const FOCUS_VISIBLE = '.Mui-focusVisible';
export const FOCUSED = '.Mui-focused';
export const REQUIRED = '.Mui-required';
export const SELECTED = '.Mui-selected';

export const FIELD_INPUT_CLASSNAME = 'btn--trigger';
