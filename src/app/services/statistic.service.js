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
  updateStatisticsUser: async () => {
    if (localStorageService.getUserId()) {
      const { data } = await httpServise.put(
        userStatisticsEndpoint +
          localStorageService.getUserId() +
          `/statistics`,
        {
          userId: localStorageService.getUserId(),
          learnedWords: 0,
          gamesAudioCall: {
            learnedWords: 3
          },
          gamesSprint: {
            learnedWords: 5
          }
        },
        {
          timestamps: { createdAt: "created_at" }
        },
        {
          headers: {
            Authorization: `Bearer ${localStorageService.getRefreshToken()}`
          }
        }
      );
      return data;
    }
  }
};

export default statisticsServisece;
