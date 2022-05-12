import fetchMkm from './fetch-mkm';
import Papa from 'papaparse';
import { isEmpty } from 'lodash';
import XMLWriter from 'xml-writer';
import pako from 'pako';

// MKM https://api.cardmarket.com/ws/documentation/API_2.0:Stock_Management
const routes = {
  GET: {
    stock: (offset) => `/stock/${offset}`,
    stockFile: ({ idGame = 1, isSealed = false, idLanguage = 1 }) =>
      `/stock/file?idGame=${idGame}&isSealed=${isSealed}&idLanguage=${idLanguage}`,
    inShoppingCart: '/stock/shoppingcart-articles',
    stockArticle: (idArticle) => `/stock/article/${idArticle}`,
    findStockArticle: (name, idGame) => `/stock/articles/${name}/${idGame}`
  },
  POST: {
    create: '/stock'
  },
  PUT: {
    update: '/stock',
    increaseQuantity: '/stock/increase',
    decreaseQuantity: '/stock/decrease'
  },
  DELETE: {
    delete: '/stock'
  }
};

// *FUNC -- Create xml object
const createXMLArticlesRequest = (inputs) => {
  const xw = new XMLWriter(true);
  xw.startDocument('1.0', 'UTF-8');
  xw.startElement('request');
  inputs.forEach((article) => {
    xw.startElement('article');
    Object.entries(article).forEach(([key, value]) => {
      xw.writeElement(key, `${value}`);
    });
    xw.endElement();
  });
  xw.endDocument();
  return xw.toString();
};

// *FUNC - Format list to be sent in Mkm
export const prepareToCreateOrUpdateMkm = ({ allIds, byId }) =>
  allIds
    .map((id) => {
      const item = byId[id];
      return {
        idProduct: parseInt(item.pid, 10),
        idLanguage: parseInt(item.language_id, 10),
        count: item.count_mkm,
        price: item.price_suggested,
        condition: item.condition,
        isFirstEd: item.is_first_ed === 't' ? true : false,
        isFoil: false,
        isAltered: false,
        isPlayset: false,
        isReverseHolo: false,
        comments: item.comments
      };
    })
    .filter((item) => item.price !== 999 && item.count);

// *FUNC - Format list to be delete in Mkm
export const prepareToDeleteOrUpdateMkm = (stock) =>
  stock.map((item) => {
    return {
      idArticle: item.id,
      count: item.count
    };
  });

/**
 * CREATE
 */

// *FUNC -- Create cards
export const createCardsInMKM = (inputs) => {
  if (isEmpty(inputs)) return false;
  const list = prepareToCreateOrUpdateMkm(inputs);
  const body = createXMLArticlesRequest(list);
  return fetchMkm(routes.POST.create, 'post', body, {
    headers: { 'Content-Type': 'text/xml; charset=UTF8' }
  });
};

/**
 * UPDATE
 */

// *FUNC -- Update cards
export const updateCardsInMKM = (inputs) => {
  if (isEmpty(inputs)) return false;
  const list = prepareToCreateOrUpdateMkm(inputs);
  const body = createXMLArticlesRequest(list);
  return fetchMkm(routes.PUT.update, 'put', body, {
    headers: { 'Content-Type': 'text/xml; charset=UTF8' }
  });
};

// *FUNC -- Update Stock
export const updateStockInMKM = (inputs, action) => {
  if (isEmpty(inputs)) return false;
  const list = prepareToCreateOrUpdateMkm(inputs);
  const body = createXMLArticlesRequest(list);
  return fetchMkm(routes.PUT[action], 'put', body, {
    headers: { 'Content-Type': 'text/xml; charset=UTF8' }
  });
};

export const increaseStockInMKM = (inputs) => {
  updateStockInMKM(inputs, 'increaseQuantity');
};

export const decreaseStockInMKM = (inputs) => {
  updateStockInMKM(inputs, 'decreaseQuantity');
};

/**
 * DELETE
 */

// *FUNC -- Delete cards
export const deleteCardsInMKM = async (inputs) => {
  const body = createXMLArticlesRequest(inputs);
  await fetchMkm(routes.DELETE.delete, 'delete', { data: body });
  return true;
};

/**
 * STOCK
 */

export const getStockFile = async (inputs = {}):Promise<any> => {
  const res = await fetchMkm(routes.GET.stockFile(inputs), 'get');

  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    // Get some base64 encoded binary data from the server. Imagine we got this:

    const b64Data = res.data.stock;
    // Decode base64 (convert ascii to binary)
    var strData = atob(b64Data);

    // Convert binary string to character-number array
    var charData = strData.split('').map(function (x) {
      return x.charCodeAt(0);
    });

    // Turn number array into byte-array
    // eslint-disable-next-line no-undef
    var binData = new Uint8Array(charData);

    let csv = pako.ungzip(binData);

    // eslint-disable-next-line no-undef
    csv = new TextDecoder('utf-8').decode(csv);

    Papa.parse(csv, {
      download: false,
      header: true,
      complete: function (results) {
        resolve(results);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};
