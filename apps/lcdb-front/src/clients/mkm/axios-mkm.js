import axios from 'axios';
import addOAuthInterceptor from '@utils/add-o-auth-interceptor';

const baseURL = 'https://api.cardmarket.com/ws/v2.0/output.json';

const axiosInstance = axios.create({
  baseURL,
  timeout: 60000
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ Axios Error - ', error);
    return error.response;
  }
);

axiosInstance.interceptors.request.use((request) => {
  const { headers, url } = request;
  const { authorization } = headers;
  const strToReplace = encodeURIComponent('{{%url%}}');
  headers.authorization = authorization.replace(strToReplace, encodeURIComponent(url.split('?')[0]));
  return request;
});

// Specify the OAuth options
const options = {
  algorithm: 'HMAC-SHA1',
  key: 'KSmgd06K8l6eTNfZ',
  secret: 'JNEZhVZJVVt6lUUplsEAMpxLaF9IOyd3',
  token: 'ejrSEzEokDM1VE9qkdaWZT2qbqBD8jDj',
  tokenSecret: 'pGYA2DG4ordtC92S5yufo8cWNBUEEba6',
  realm: `${baseURL}{{%url%}}`,
  includeBodyHash: false
};

// Add interceptor that signs requests
addOAuthInterceptor(axiosInstance, options);

export default axiosInstance;
