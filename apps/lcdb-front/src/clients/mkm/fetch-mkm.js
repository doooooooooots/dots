import axiosInstance from './axios-mkm';

const fetchMkm = async (url, method = 'post', body = {}, config = {}) => {
  let response = null;

  if (['post', 'put'].includes(method)) {
    config = {
      ...config,
      headers: { 'Content-Type': 'text/xml; charset=UTF8' },
    };
  }

  try {
    response = await axiosInstance[method](url, body, config);
    return response;
  } catch (err) {
    return err;
  }
};

export default fetchMkm;
