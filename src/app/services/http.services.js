import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import authService from "./auth.service";
import localStorageService from "./localStorage.service";

const http = axios.create({
  baseURL: configFile.apiEndPoint
});

http.interceptors.request.use(
  async function (config) {
    const expiresData = localStorageService.getExpiresToken();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpire = refreshToken && expiresData < Date.now();

    if (isExpire) {
      const { data } = await authService.refresh(
        localStorageService.getUserId()
      );
      console.log(data);

      localStorageService.setTokens(data);
    }

    const accessToken = localStorageService.getAccessToken();

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      toast.error("Что то пошло не так");
    }
    return Promise.reject(error);
  }
);

const httpServise = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
};

export default httpServise;
