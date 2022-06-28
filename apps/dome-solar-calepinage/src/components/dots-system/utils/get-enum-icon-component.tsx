import { toCamelCase } from 'js-convert-case';
import CalendarIcon from '../../design-system/icons/icons-calendar';
import EmergencyIcon from '../../design-system/icons/icons-emergency';
import ProgressIcon from '../../design-system/icons/icons-progress';
import dynamic from 'next/dynamic';

const AlignmentsIcons = dynamic(
  () => import('../../../icons/alignments-icons'),
  {
    ssr: false,
  }
);

function getEnumIconComponent(enumName: string) {
  const _enumName = toCamelCase(enumName);

  switch (_enumName) {
    case 'aligment':
      return AlignmentsIcons;
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
