import axios from "axios";
const APIClient = axios.create({
  baseURL: "https://bucketsinvestingserver.herokuapp.com/",
  // baseURL: 'https://buckets-rahul-server.herokuapp.com',
  // baseURL: 'http://192.168.0.243:5000',
  // baseURL:'http://localhost:6000'
});
export const insertTokenInHeaders = (token, onFinish = () => {}) => {
  APIClient.defaults.headers.common["Authorization"] = `${token}`;
  onFinish();
};
export default APIClient;
