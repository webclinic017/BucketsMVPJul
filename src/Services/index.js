import axios from 'axios';

const APIClient = axios.create({
  baseURL: 'https://floating-forest-52806.herokuapp.com/https://buckets-server-v3.herokuapp.com'
  // baseURL: 'http://127.0.0.1:5000'
  // baseURL: 'https://buckets-server-v3.herokuapp.com'
});

export const insertTokenInHeaders = (token) => {
  APIClient.defaults.headers.common['Authorization'] = `${token}`;
};

export default APIClient;