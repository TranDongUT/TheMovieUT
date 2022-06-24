import axios from "axios";
import apiConfig from "./apiConfig";
import queryString from "query-string";
import { firebaseApp } from "../firebase/firebaseConfig";

const getFirebaseToken = async () => {
  const currentUser = firebaseApp.auth().currentUser;
  if (currentUser) {
    return currentUser.getIdToken();
  }

  //not login
  const storageToken = localStorage.getItem("isLoginFirebase");
  if (!storageToken) {
    return null;
  }

  //login but wait token
  // return new Promise((resolve, reject) => {
  //   const wait = setTimeout(() => {
  //     reject(null);
  //   }, 10000);

  //   const unregisterAuthObserver = firebaseApp
  //     .auth()
  //     .onAuthStateChanged(async (user) => {
  //       if (!user) {
  //         reject(null);
  //       }

  //       const token = await user.getIdToken();
  //       localStorage.setItem("isLoginFirebase", token);
  //       resolve(token);

  //       unregisterAuthObserver();
  //       clearTimeout(wait);
  //     });
  // });
};

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
  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `token ${token}`;
  }
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
