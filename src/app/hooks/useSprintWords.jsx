import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import wordServisece from "../services/word.service";
import { toast } from "react-toastify";

const SprintWordContext = React.createContext();

export const useSprintWord = () => {
  return useContext(SprintWordContext);
};

const SprintWordProvaider = ({ children }) => {
  const [allGroupWords, setAllGroupWords] = useState([]);
  const [wordsGameSprintDictionary, setWordsGameSprintDictionary] = useState(
    []
  );
  const [group, setGroup] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getCurrentWordsDictionary(groupSelect, page) {
    if (!isLoading) {
      setGroup(groupSelect);
    }
    setWordsGameSprintDictionary([]);
    let pageIndex = Number(page);
    while (pageIndex < Number(page) + 5) {
      try {
        const { content } = await wordServisece.get(groupSelect, pageIndex);
        const shuffledArr = (array) => array.sort(() => 0.5 - Math.random());
        setWordsGameSprintDictionary((wordsGameDictionary) => [
          ...wordsGameDictionary,
          shuffledArr(content)
        ]);
        if (pageIndex === pageIndex + 4) {
          setLoading(false);
        }
        pageIndex += 1;
      } catch (error) {
        errorCatcher(error);
      }
    }
  }

  async function getAllGroupWords(groupSelect) {
    if (!isLoading) {
      setGroup(groupSelect);
    }
    setAllGroupWords([]);
    let pageIndex = 0;
    while (pageIndex < 30) {
      try {
        const { content } = await wordServisece.get(
          groupSelect || group,
          pageIndex
        );
        const shuffledArr = (array) => array.sort(() => 0.5 - Math.random());
        setAllGroupWords((allGroupWords) => [
          ...allGroupWords,
          shuffledArr(content)
        ]);
        if (pageIndex === 29) {
          setLoading(false);
        }
        pageIndex += 1;
      } catch (error) {
        errorCatcher(error);
      }
    }
  }

  function errorCatcher(error) {
    const { message } = error.response;
    setError(message);
  }
  return (
    <SprintWordContext.Provider
      value={{
        allGroupWords,
        wordsGameSprintDictionary,
        getAllGroupWords,
        getCurrentWordsDictionary,
        setWordsGameSprintDictionary
      }}
    >
      {children}
    </SprintWordContext.Provider>
  );
};

SprintWordProvaider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default SprintWordProvaider;
