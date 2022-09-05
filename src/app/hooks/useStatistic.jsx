import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import statisticsService from "../services/statistic.service";
import { useWord } from "./useWords";

const StatisticsContext = React.createContext();

export const useStatistic = () => {
  return useContext(StatisticsContext);
};

const StatisticsProvaider = ({ children }) => {
  const { currentUser } = useAuth();
  const { wordsUser } = useWord();
  const [statistics, setStatistics] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getStatistics();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getStatistics() {
    try {
      const { content } = await statisticsService.get();
      setStatistics(content);
      setLoading(false);
    } catch (error) {
      statisticsService.createStatisticsUser();
      getStatistics();
      errorCatcher("Создание пользователя");
    }
  }

  async function updateStatistics(
    nameGame,
    learnedNewWordsGame,
    scoreGame,
    percentageGame,
    gamesPlayedGame
  ) {
    try {
      const learnedWordsUser = wordsUser.filter((w) => {
        return w.difficulty === "midle";
      });

      const allWordsNew =
        learnedNewWordsGame + statistics[nameGame].learnedNewWords;

      const { content } = await statisticsService.updateStatisticsUser(
        learnedWordsUser.length,
        nameGame,
        allWordsNew,
        scoreGame > statistics[nameGame].score
          ? scoreGame
          : statistics[nameGame].score,
        statistics[nameGame].percentage === 0
          ? percentageGame
          : (statistics[nameGame].percentage + percentageGame) / 2,
        (gamesPlayedGame = statistics[nameGame].gamesPlayed + 1)
      );
      setStatistics(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    setError(error);
  }

  return (
    <StatisticsContext.Provider
      value={{
        statistics,
        isLoading,
        setLoading,
        updateStatistics
      }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};

StatisticsProvaider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default StatisticsProvaider;
