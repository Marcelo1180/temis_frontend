import axios from "axios";
import { URL_BASE } from "../constants";

const apiPrivate = axios.create({
  baseURL: URL_BASE,
});

const apiPublic = axios.create({
  baseURL: URL_BASE,
});

apiPrivate.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("temis_token");
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { apiPrivate, apiPublic };
