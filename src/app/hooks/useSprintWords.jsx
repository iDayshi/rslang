import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import wordServisece from "../services/word.service";
import { toast } from "react-toastify";

const SprintWordContext = React.createContext();

export const useSprintWord = () => {
  return useContext(SprintWordContext);
};

const SprintWordProvaider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [allGroupWords, setAllGroupWords] = useState([]);
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function getWordsById(wordsId) {
    return words.find((u) => u._id === wordsId);
  }

  async function getWords(groupSelect, pageSelect) {
    if (!isLoading) {
      setGroup(groupSelect);
      setPage(pageSelect);
    }
    try {
      const { content } = await wordServisece.get(
        groupSelect || group,
        pageSelect || page
      );
      setWords(content);
      setLoading(false);
    } catch {
      errorCatcher(error);
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
      } catch {
        errorCatcher(error);
      }
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  return (
    <SprintWordContext.Provider
      value={{ words, allGroupWords, getWordsById, getWords, getAllGroupWords }}
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
