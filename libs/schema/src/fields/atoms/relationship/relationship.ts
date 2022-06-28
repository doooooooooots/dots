import * as columns from '../../../columns';
import * as forms from '@dots.cool/form-builder';
import * as yup from 'yup';

import {
  hasUiColumn,
  addUiColumn,
  hasValidation,
  addValidation,
  hasDefaultValue,
  addDefaultValue,
  addUiInput,
  hasUiInput,
  initField,
} from '../../builder';

import { FIELD_TYPES } from '@dots.cool/tokens';

import { BaseFieldConfig, Field } from '../../../types/field';
type RelationShipFieldType = BaseFieldConfig & {
  options: string;
  many?: boolean;
};

function relationship(config: RelationShipFieldType): Field {
  return {
    type: FIELD_TYPES.relationship,
    many: false,
    ...config,
  };
}

export default relationship;

// //* RELATIONSHIP
// const relationship = (config) => {
//   //? Create basic fields if missing
//   initField(config);

//   const { ref, many, ui } = config;

//   const isManyRelationShip = !(many === false);
//   const { columnField } = ui;

//   //? Add default input
//   if (!hasUiInput(config))
//     addUiInput(
//       config,
//       forms.autocompleteWithForm({
//         multiple: isManyRelationShip,
//       })
//     );

//   //? Add default columns
//   if (!hasUiColumn(config)) {
//     if (!isManyRelationShip) {
//       addUiColumn(
//         config,
//         columns.relationshipSingle({
//           target: ref,
//           indexColumn: columnField,
//         })
//       );
//     } else {
//       config.query = (plurial: string) => `${plurial}Count`;
//       addUiColumn(
//         config,
//         columns.relationshipMany({
//           target: ref,
//         })
//       );
//     }
//   }

//   //? Add default formatting data (runs before submit)
//   if (!hasFormatData(config)) {
//     if (!isManyRelationShip) {
//       config.formatData =
//         (fieldName: string) => (data: { [fieldName: string]: unknown }) => {
//           if (fieldName in data) {
//             data[fieldName] = {
//               connect: { id: (data[fieldName] as { id: string }).id },
//             };
//           }
//           return data;
//         };
//     } else {
//       config.formatData =
//         (fieldName: string) =>
//         (data: { [fieldName: string]: string | object | object[] }) => {
//           if (fieldName in data && isArray(data[fieldName])) {
//             data[fieldName] = {
//               connect: (data[fieldName] as Array<{ id: string }>).map(
//                 ({ id }: EntityType) => ({
//                   id,
//                 })
//               ),
//             };
//           }
//           return data;
//         };
//     }
//   }

//   //? Force sortable to be false (graphQL APIs does not allow linked data sort)
//   config.sortable = false;

//   // if (!hasValidation(config)) addValidation(config, yup.boolean());
//   // if (!hasDefaultValue(config)) addDefaultValue(config, false);

//   config.many = isManyRelationShip;
//   config.type = FIELD_TYPES.relationship;
//   return config;
// };
