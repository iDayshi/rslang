import axios from "axios";
// import localStorageService from "./localStorage.service";
import configFile from "../config.json";

const httpAuth = axios.create({
  baseURL: configFile.apiEndPoint
});

const authService = {
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(`/signin`, {
      email,
      password
    });
    return data;
  },
  refresh: async (userId) => {
    const { data } = await httpAuth.get(`/users/${userId}/tokens`);
    return data;
  }
};

export default authService;
