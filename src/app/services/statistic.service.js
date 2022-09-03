import httpServise from "./http.services";
import localStorageService from "./localStorage.service";

const userStatisticsEndpoint = "/users/";

const statisticsServisece = {
  get: async () => {
    const { data } = await httpServise.get(
      userStatisticsEndpoint + localStorageService.getUserId() + `/statistics`
    );
    return data;
  },
  updateWordUser: async () => {
    const { data } = await httpServise.put(
      userStatisticsEndpoint + localStorageService.getUserId() + `/statistics`,
      {
        learnedWords: 0,
        optional: {
          day: Date.now()
        }
      }
    );
    return data;
  }
};

export default statisticsServisece;
