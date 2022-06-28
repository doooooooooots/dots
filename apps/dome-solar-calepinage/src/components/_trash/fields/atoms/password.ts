import { BaseFieldConfig } from '../../types/field';

type PasswordFieldType = BaseFieldConfig;

function password(args: PasswordFieldType) {
  return {
    type: 'password',
    ...args,
  };
}

export default password;
