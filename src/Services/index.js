import axios from 'axios';

const APIClient = axios.create({
  baseURL: 'https://buckets-server-v3.herokuapp.com'
  // baseURL: 'http://192.168.10.5:5000'
});

export const insertTokenInHeaders = (token) => {
  APIClient.defaults.headers.common['Authorization'] = `${token}`;
};

export default APIClient;