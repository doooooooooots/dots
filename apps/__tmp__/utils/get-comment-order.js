const regex = /^(?:\([^)]*\))?([^[]*)(?:\[[^\]]*])?/;

export const getCommentOrder = (id) => {
  let storage = id.split('-')[4];
  const match = storage.match(regex);
  if (match && match.length > 1) {
    storage = match[1];
  }
  if (storage === '') {
    return 1;
  }
  if (
    storage[0] === 'C' ||
    storage.slice(0, 3) === 'Y C' ||
    storage.slice(0, 2) === 'YC' ||
    storage.slice(0, 3) === 'Y/C'
  ) {
    return 2;
  }
  return 1;
};
