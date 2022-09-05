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
  updateStatisticsUser: async (
    learnedWordsUser,
    nameGame,
    learnedNewWordsGame,
    seriesGame,
    percentageGame,
    gamesPlayedGame
  ) => {
    if (localStorageService.getUserId()) {
      const { data } = await httpServise.put(
        userStatisticsEndpoint +
          localStorageService.getUserId() +
          `/statistics`,
        {
          userId: localStorageService.getUserId(),
          learnedWords: learnedWordsUser || 0,
          [nameGame]: {
            learnedNewWords: learnedNewWordsGame || 0,
            series: seriesGame || 0,
            percentage: percentageGame || 0,
            gamesPlayed: gamesPlayedGame || 0
          }
        },
        {
          timestamps: { createdAt: "created_at" }
        },
        {
          headers: {
            Authorization: `Bearer ${localStorageService.getAccessToken()}`
          }
        }
      );
      return data;
    }
  }
};

export default statisticsServisece;
