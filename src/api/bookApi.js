import axiosClient from "./axiosClient";

const bookApi = {
  getAll: (params = " ") => {
    const url = "/volumes";
    return axiosClient.get(url, { params });
  },
};

export default bookApi;
