import { FIELD_TYPES } from '@dots.cool/tokens';

export default function createFieldApi(fields) {
  const getRelationship = () => {
    return Object.fromEntries(
      Object.entries(fields).filter(
        ([fieldName, item]) => item.type === FIELD_TYPES.relationship
      )
    );
  };

  return {
    getRelationship,
  };
}
