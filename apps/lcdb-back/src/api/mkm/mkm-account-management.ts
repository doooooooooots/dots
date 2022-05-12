import fetchMkm from './fetch-mkm';

const routes = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {}
};

export const getAllExpansionsForGameId = async (gameId) => {
  return fetchMkm('', 'get');
};
