import xmlWriter from 'xml-writer';
import fetchMkm from './fetch-mkm';

const SELLER = 1;
const BUYER = 2;

const BOUGHT = 1;
const PAID = 2;
const SENT = 4;
const RECEIVED = 8;
const LOST = 32;
const CANCELLED = 128;

const routes = {
  GET: {
    get: (idOrder) => `/order/${idOrder}`,
    getAllByState: (actor, state, start) => `/orders/${actor}/${state}${start ? `/${start}` : ''}`
  },
  POST: {
    evaluate: (idOrder) => `/order/${idOrder}/evaluation`
  },
  PUT: {
    updateOne: (idOrder) => `/order/${idOrder}`,
    updateTrackingNumber: (idOrder) => `/order/${idOrder}/tracking`
  }
};

/**
 * @TrackingNumber
 */

const createXMLTrackingNumber = (trackingNumber) => {
  const xw = new xmlWriter(true);
  xw.startDocument('1.0', 'UTF-8');
  xw.startElement('request');
  xw.writeElement(trackingNumber, `${trackingNumber}`);
  xw.endDocument();
  return xw.toString();
};

export const addTrackingNumber = (trackingNumber) => {
  const body = createXMLTrackingNumber(trackingNumber);
  return fetchMkm(routes.PUT.updateTrackingNumber, 'put', body);
};

/**
 * @Order
 */

export const getOrder = (orderId) => {
  return fetchMkm(routes.GET.get(orderId), 'get');
};

export const getOrders = async (actor, state, start) => {
  return fetchMkm(routes.GET.getAllByState(actor, state, start), 'get');
};

// SELLER
export const getBoughtOrders = (start = null) => getOrders(SELLER, BOUGHT, start);
export const getPaidOrders = async (start = null) => getOrders(SELLER, PAID, start);
export const getSentOrders = (start = null) => getOrders(SELLER, SENT, start);
export const getReceivedOrders = (start = null) => getOrders(SELLER, RECEIVED, start);
export const getLostOrders = (start = null) => getOrders(SELLER, LOST, start);
export const getCancelledOrders = (start = null) => getOrders(SELLER, CANCELLED, start);

// BUYER
export const getMyBoughtOrders = (start = null) => getOrders(BUYER, BOUGHT, start);
export const getMyPaidOrders = (start = null) => getOrders(BUYER, PAID, start);
export const getMySentOrders = (start = null) => getOrders(BUYER, SENT, start);
export const getMyReceivedOrders = (start = null) => getOrders(BUYER, RECEIVED, start);
export const getMyLostOrders = (start = null) => getOrders(BUYER, LOST, start);
export const getMyCancelledOrders = (start = null) => getOrders(BUYER, CANCELLED, start);

//https://api.cardmarket.com/ws/documentation/API_2.0:Order
export const updateOrder = (orderId, action, reason = null, relistItems = null) => {

  const xw = new xmlWriter(true);
  xw.startDocument('1.0', 'UTF-8');
  xw.startElement('request');
  xw.writeElement('action', `${action}`);
  if (action === 'requestCancellation' && reason) {
    xw.writeElement('reason', `${reason}`);
  }
  if (action === 'acceptCancellation' && relistItems) {
    xw.writeElement('acceptCancellation', `${relistItems}`);
  }
  xw.endDocument();
  const response = xw.toString();

  return fetchMkm(routes.PUT.updateOne(orderId), 'put', response);
};

export const orderConfirmSending = (orderId) => updateOrder(orderId, 'send');
export const orderConfirmReception = (orderId) => updateOrder(orderId, 'confirmReception');
export const orderCancel = (orderId) => updateOrder(orderId, 'cancel');
export const orderRequestCancellation = (orderId, reason = null) => updateOrder(orderId, 'requestCancellation', reason);
export const orderAcceptCancellation = (orderId, relistItems = false) =>
  updateOrder(orderId, 'acceptCancellation', null, relistItems);

/**
 * @Evaluate
 */

export const evaluateOrder = (orderId, evaluation) => {
  const { grade, description, packaging, comment, complaints } = evaluation;

  const xw = new xmlWriter(true);
  xw.startDocument('1.0', 'UTF-8');
  xw.startElement('request');
  xw.writeElement('evaluationGrade', `${grade}`);
  xw.writeElement('itemDescription', `${description}`);
  xw.writeElement('packaging', `${packaging}`);
  xw.writeElement('comment', `${comment}`);
  complaints.forEach((complaint) => {
    xw.writeElement('complaint', `${complaint}`);
  });
  xw.endDocument();

  return fetchMkm(routes.POST.evaluate(orderId), 'post', xw.toString());
};
