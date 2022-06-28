import { BaseFieldConfig } from '../../../types/field';

type RelationShipFieldType = BaseFieldConfig & {
  options: string;
  many?: boolean;
};

function relationship(args: RelationShipFieldType) {
  return {
    type: 'relationship',
    many: false,
    ...args,
  };
}

export default relationship;
