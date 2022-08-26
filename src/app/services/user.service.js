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
  },
  addWordUser: async (wordId) => {
    const { data } = await httpServise.post(
      userEndpoint + localStorageService.getUserId() + `/words/${wordId}`,
      {
        difficulty: "string",
        optional: {
          count: 5
        }
      }
    );
    return data;
  },
  getWordsUser: async () => {
    const { data } = await httpServise.get(
      userEndpoint + localStorageService.getUserId() + `/words/`,
      {
        headers: {
          Authorization: `Bearer ${localStorageService.getRefreshToken()}`
        }
      }
    );
    return data;
  }
};

export default userServisece;
