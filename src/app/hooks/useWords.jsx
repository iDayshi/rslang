import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import wordServisece from "../services/word.service";
import { toast } from "react-toastify";
import userServisece from "../services/user.service";

const WordContext = React.createContext();

export const useWord = () => {
  return useContext(WordContext);
};

const WordProvaider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [wordsUser, setWordsUser] = useState([]);
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWords();
    getAllWordsUser();
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
        groupSelect ?? group,
        pageSelect ?? page
      );
      setWords(content);
      setLoading(false);
    } catch {
      errorCatcher(error);
    }
  }

  async function getAllWordsUser() {
    try {
      const { content } = await userServisece.getWordsUser();
      setWordsUser(content);
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
    <WordContext.Provider
      value={{ words, wordsUser, getWordsById, getWords, getAllWordsUser }}
    >
      {!isLoading ? children : "Загрузка слов....и супер красивый спинер"}
    </WordContext.Provider>
  );
};

WordProvaider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default WordProvaider;
