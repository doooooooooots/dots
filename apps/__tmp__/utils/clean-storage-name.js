import { isEmpty } from 'lodash';

const cleanComment = (comment) => {
  if (!comment) return '';

  let path = comment.replace(/\s+/g, '-').toUpperCase();
  path = path.split('-');
  let storageName = path.shift();

  switch (storageName) {
    case 'R21/F':
      storageName = 'YRF|001';
      break;
    case 'R22/F':
      storageName = 'YRF|001';
      break;
    case '(2)YCF[03]':
      storageName = 'YCF|003';
      break;
    case '(08)YRG[01]':
      storageName = 'YRG|001';
      break;
    case '(09)YRF[01]':
      storageName = 'YRF|001';
      break;
    case '(5)YRX[01]':
      storageName = 'YRX|001';
      break;
    case 'E&F':
      storageName = 'YC!|001';
      break;
    default:
      break;
  }

  if (storageName === 'YXR|001') {
    storageName = 'YRX|001';
  }

  path = path.filter(Boolean);
  if (isEmpty(path)) {
    return `${storageName}`.replace(/[)(]/g, '');
  }
  return `${storageName}-${path.join('-')}`.replace(/[)(]/g, '');
};

export default cleanComment;
