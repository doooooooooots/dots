// import AsyncLocalStorage from '@createnextapp/async-local-storage';
import capitalizeFirstLetter from '@utils/capitalize-first-letter';
import isNullOrEmptyArray from '@utils/is-null-or-array';
import filterObject from '@utils/filter-object';
import { mutationQuery, mutationMultipleQuery, queryMultipleQuery, queryQuery } from '@utils/stringify-query';
import axiosInstance from './axios-heroku';
import toast from 'react-hot-toast';

const fetchGQL = async (query, method = 'post', params = {}, successMessage = null) => {
  let response = null;

  // const token = await AsyncLocalStorage.getItem('accessToken');

  const headers = {
    // Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Formulars creates null id when creation
  // So we delete here null ids
  if (params?.input?.id === null) {
    delete params.input.id;
  }

  try {
    response = await axiosInstance[method](
      '/graphql',
      {
        query,
        variables: params
      },
      { headers }
    );

    const res = JSON.parse(JSON.stringify(response.data));

    if (!res.data || res.errors) {
      throw res.error;
    }

    if (successMessage !== null) toast.success(successMessage);
    return res.data;

    // Case of error
  } catch (err) {
    console.error('❌ fetchGQL NETWORK', err);
    toast.error("Oupsy - une erreur est survenue pendant l'action");
    return false;
  }
};

/**
 * *Query
 * --------------------------------
 * @param {*} entity
 * @param {*} input
 * @param {*} output
 * @returns
 */
const query = async (entity, input, output = null) => {
  const response = await fetchGQL(queryQuery(entity, output), 'post', input);
  if (response && response[entity]) return response[entity];
  return response;
};

const queryMultiple = async (entities, params = {}, output = null) => {
  let { filter = {}, pagination = {}, orderBy = {} } = params;
  let inputs = {
    filter: filterObject(filter, isNullOrEmptyArray),
    pagination: filterObject(pagination, isNullOrEmptyArray),
    orderBy: filterObject(orderBy, isNullOrEmptyArray)
  };
  const response = await fetchGQL(queryMultipleQuery(entities, output), 'post', inputs);
  if (response && response[entities]) return response[entities];
  return response;
};

/**
 * *Mutation
 * --------------------------------
 * @param {*} type
 * @param {*} entity
 * @param {*} input
 * @param {*} output
 * @returns
 */
const mutation = async (type, entity, input, output = null) => {
  const response = await fetchGQL(
    mutationQuery(type, entity, output),
    'post',
    input,
    `${capitalizeFirstLetter(type)} - ${entity} OK`
  );
  if (response && response[`${type}${capitalizeFirstLetter(entity)}`])
    return response[`${type}${capitalizeFirstLetter(entity)}`];
  return response;
};

const mutationMultiple = async (type, entities, input, output = null) => {
  const response = await fetchGQL(
    mutationMultipleQuery(type, entities, output),
    'post',
    input,
    `${capitalizeFirstLetter(type)} - ${entities} -> OK 👍`
  );
  const resName = `${type}${capitalizeFirstLetter(entities)}`;
  if (response && response[resName]) return response[resName];
  return response;
};

/**
 * *Make methods
 * --------------------------------
 * @param {*} singular
 * @param {*} plurial
 * @returns
 */
export const makeMethods = (singular, plurial) => ({
  get: (id, output = null) => query(singular, { id }, output),
  getMultiple: (params, output = null) => queryMultiple(plurial, params, output),
  create: (attributes, output = null) => mutation('create', singular, { input: { attributes } }, output),
  createMultiple: (elements, output = null) => mutationMultiple('create', plurial, { input: { elements } }, output),
  update: ({ id, attributes }, output = null) => mutation('update', singular, { input: { id, attributes } }, output),
  updateMultiple: ({ ids, attributes }, output = null) =>
    mutationMultiple('update', plurial, { input: { ids, attributes } }, output),
  deleteOne: (id, output = null) => mutation('delete', singular, { input: { id } }, output),
  deleteMultiple: (ids, output = null) => mutationMultiple('delete', plurial, { input: { ids } }, output)
});

export default fetchGQL;
