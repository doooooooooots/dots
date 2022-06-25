import { BaseFieldConfig } from '../../types/field';

type RelationShipFieldType = BaseFieldConfig & {
  select: string;
  many?: boolean;
  getter: (item: { [key: string]: any }) => string;
};

function relationship(args: RelationShipFieldType) {
  return {
    type: 'relationship',
    many: false,
    ...args,
  };
}

export default relationship;
