import { FIELD_TYPES } from '@dots.cool/tokens';

const fieldDefaultValues = {
  [FIELD_TYPES.checkbox]: false,
  [FIELD_TYPES.color]: '#fff',
  [FIELD_TYPES.dimension]: 0,
  [FIELD_TYPES.document]: '',
  [FIELD_TYPES.file]: null,
  [FIELD_TYPES.float]: 0,
  [FIELD_TYPES.image]: {},
  [FIELD_TYPES.integer]: null,
  [FIELD_TYPES.json]: null,
  [FIELD_TYPES.password]: '',
  [FIELD_TYPES.relationship]: {},
  [FIELD_TYPES.select]: {},
  [FIELD_TYPES.text]: '',
  [FIELD_TYPES.timestamp]: new Date(),
  [FIELD_TYPES.virtual]: null,
};

export default fieldDefaultValues;
