import httpServise from "./http.services";
import localStorageService from "./localStorage.service";

const userEndpoint = "/users/";

const userServisece = {
  get: async (userId) => {
    const { data } = await httpServise.get(userEndpoint + userId);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpServise.post(userEndpoint, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpServise.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpServise.put(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    return data;
  }
};

export default userServisece;
