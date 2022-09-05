import httpServise from "./http.services";
import localStorageService from "./localStorage.service";

const userStatisticsEndpoint = "/users/";

const statisticsService = {
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
    let newParams = {};
    if (!nameGame) {
      newParams = {
        userId: localStorageService.getUserId(),
        learnedWords: 0,
        gamesAudioCall: {
          learnedNewWords: 0,
          series: 0,
          percentage: 0,
          gamesPlayed: 0
        },
        gamesSprint: {
          learnedNewWords: 0,
          series: 0,
          percentage: 0,
          gamesPlayed: 0
        }
      };
    } else {
      newParams = {
        userId: localStorageService.getUserId(),
        learnedWords: learnedWordsUser || 0,
        [nameGame]: {
          learnedNewWords: learnedNewWordsGame || 0,
          series: seriesGame || 0,
          percentage: percentageGame || 0,
          gamesPlayed: gamesPlayedGame || 0
        }
      };
    }
    const { data } = await httpServise.put(
      userStatisticsEndpoint + localStorageService.getUserId() + `/statistics`,
      newParams,
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
};

export default statisticsService;
