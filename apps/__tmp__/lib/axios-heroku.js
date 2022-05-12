import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'https://lcdb-console.herokuapp.com',
  timeout: 30 * 1000 //ms
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ Axios Error - ', error);
    // eslint-disable-next-line no-undef
    return Promise.reject(error || 'Axios Interceptor Something went wrong');
  }
);

export default axiosInstance;
