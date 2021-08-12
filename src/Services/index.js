import axios from 'axios';

const APIClient = axios.create({
  baseURL: 'https://buckets-server-v3.app.com/'
  // baseURL: 'http://127.0.0.1:5000'
});

export const insertTokenInHeaders = (token) => {
  APIClient.defaults.headers.common['Authorization'] = `${token}`;
};

export default APIClient;