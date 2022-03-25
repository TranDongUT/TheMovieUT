import axios from "axios";
import apiConfig from "./apiConfig";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: apiConfig.bareUrl,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
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
