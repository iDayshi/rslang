import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import wordServisece from "../services/word.service";
import { toast } from "react-toastify";
import getRandomInt from "../utils/getRandomInt";

const AudioCallContext = React.createContext();

export const useAudioCall = () => {
  return useContext(AudioCallContext);
};

const AudioCallProvaider = ({ children }) => {
  const [wordsGame, setWordsGame] = useState([]);
  const [wordsGameDictionary, setWordsGameDictionary] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getWordsGame(groupSelect) {
    try {
      const { content } = await wordServisece.get(
        groupSelect,
        getRandomInt(0, 29)
      );
      setWordsGame(content);
      setLoading(false);
    } catch {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <AudioCallContext.Provider
      value={{
        wordsGame,
        isLoading,
        wordsGameDictionary,
        getWordsGame,
        setWordsGameDictionary
      }}
    >
      {children}
    </AudioCallContext.Provider>
  );
};

AudioCallProvaider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AudioCallProvaider;
