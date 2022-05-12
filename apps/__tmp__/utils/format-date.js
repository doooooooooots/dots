import moment from 'moment';

export const plainTextDateTime = (dateTime) => {
  return moment(dateTime).format('DD MMMM HH:mm'); // 06 Février 13:35
};
export const getDate = (dateTime) => {
  return moment(dateTime).format('DD MMMM'); // 06 Février
};
export const getTime = (dateTime) => {
  return moment(dateTime).format('HH:mm'); // 13:35
};
