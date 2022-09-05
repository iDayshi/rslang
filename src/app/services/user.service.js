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
  addWordUser: async (wordId, type, optionalParams) => {
    const { data } = await httpServise.post(
      userEndpoint + localStorageService.getUserId() + `/words/${wordId}`,
      {
        difficulty: type,
        optional: optionalParams
      }
    );
    return data;
  },
  updateWordUser: async (wordId, type, optionalParams) => {
    const { data } = await httpServise.put(
      userEndpoint + localStorageService.getUserId() + `/words/${wordId}`,
      {
        difficulty: type,
        optional: optionalParams
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
  },
  deleteWordUser: async (wordId) => {
    await httpServise.delete(
      userEndpoint + localStorageService.getUserId() + `/words/${wordId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorageService.getRefreshToken()}`
        }
      }
    );
  }
};

export default userServisece;
