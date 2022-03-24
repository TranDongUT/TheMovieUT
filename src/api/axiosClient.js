import axios from "axios";
import queryString from "query-string";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BOOKAPI_URL,
  headers: {
    "content-type": "application/json",
    //"x-api-key": "AIzaSyB_Xn9cu0nCA15oMjuS83ciVvSHPYmYUVg",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  //handle Token
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    //handle Error
    throw error;
  }
);

export default axiosClient;
