import axios from 'axios';

const APIClient = axios.create({
  baseURL: 'https://floating-forest-52806.herokuapp.com/https://buckets-server-v3.herokuapp.com'
  // baseURL: 'http://localhost:8080//http://127.0.0.1:5000'
});

export const insertTokenInHeaders = (token) => {
  APIClient.defaults.headers.common['Authorization'] = `${token}`;
};

export default APIClient;