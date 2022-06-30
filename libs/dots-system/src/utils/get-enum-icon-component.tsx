import {
  CalendarIcon,
  EmergencyIcon,
  ProgressIcon,
} from '@dots.cool/components';
import { toCamelCase } from 'js-convert-case';

function getEnumIconComponent(enumName: string) {
  const _enumName = toCamelCase(enumName);

  switch (_enumName) {
    case 'progress':
      return ProgressIcon;
    case 'emergency':
      return EmergencyIcon;
    case 'calendar':
      return CalendarIcon;
    default:
      return null;
  }
}

export default getEnumIconComponent;
