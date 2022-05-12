import { isObject } from 'lodash';
import fetchMkm from './fetch-mkm';

//params : search<string> | exact<bool> | idGame<int> | idLanguage<int> | start<int> maxResults<int>
//params : idProduct<int> | start<int> maxResults<int> | userType<private|commercial|powerseller>
// minUserScore<1..5> | idLanguage<1..15> | minCondition<MT|NM|EX|GD|LP|PL|PO> | isFoil<bool>
// isSigned<bool> | isAltered<bool> | minAvailable<int>

const routes = {
  GET: {
    games: () => `/games`,
    expansions: (idGame) => `/games/${idGame}/expansions`,
    expansionSingles: (idExpansion) => `/expansions/${idExpansion}/singles`,
    product: (idProduct) => `/products/${idProduct}`,
    productList: () => `/productlist`,
    priceGuide: (idGame = 1) => `/priceguide?${idGame}`,
    findProducts: (params) => `/products/find?${params}`,
    articles: (idProduct, params) => `/articles/${idProduct}${params ? '?' + params : ''}`,
    metaproducts: (idMetaproduct) => `/metaproducts/${idMetaproduct}`,
    findMetaproducts: (params) => `/metaproducts/find?${params}`,
    users: (idUser) => `/users/${idUser}`,
    findUsers: (params) => `/users/find?${params}`,
    articleUsers: (idUser, params) => `/users/${idUser}/articles${params ? '?' + params : ''}`
  }
};

function makeQuery(params) {
  let queryString = params;
  if (params && isObject(params)) {
    queryString = new URLSearchParams(params).toString();
  }
  return queryString;
}

export const getGames = async () => {
  return fetchMkm(routes.GET.games(), 'get');
};
export const getExpansions = async (idGame) => {
  return fetchMkm(routes.GET.expansions(idGame), 'get');
};
export const getExpansionSingles = async (idExpansion) => {
  return fetchMkm(routes.GET.expansionSingles(idExpansion), 'get');
};
export const getProduct = async (idProduct) => {
  return fetchMkm(routes.GET.product(idProduct), 'get');
};
export const getProductList = async () => {
  return fetchMkm(routes.GET.productList(), 'get');
};
export const getPriceGuide = async (idGame = 1) => {
  return fetchMkm(routes.GET.priceGuide(idGame), 'get');
};
export const getFindProducts = async (params) => {
  return fetchMkm(routes.GET.findProducts(makeQuery(params)), 'get');
};
export const getArticles = async (idProduct, params) => {
  return fetchMkm(routes.GET.articles(idProduct, makeQuery(params)), 'get');
};
export const getMetaproducts = async (idMetaproduct) => {
  return fetchMkm(routes.GET.metaproducts(idMetaproduct), 'get');
};
export const getFindMetaproducts = async (params) => {
  return fetchMkm(routes.GET.findMetaproducts(makeQuery(params)), 'get');
};
export const getUsers = async (idUser) => {
  return fetchMkm(routes.GET.users(idUser), 'get');
};
export const getFindUsers = async (params) => {
  return fetchMkm(routes.GET.findUsers(makeQuery(params)), 'get');
};
export const getArticleUsers = async (idUser, params) => {
  return fetchMkm(routes.GET.articleUsers(idUser, makeQuery(params)), 'get');
};
