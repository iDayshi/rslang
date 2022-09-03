import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import wordServisece from "../services/word.service";
import { toast } from "react-toastify";
import userServisece from "../services/user.service";
import { useAuth } from "./useAuth";

const WordContext = React.createContext();

export const useWord = () => {
  return useContext(WordContext);
};

const WordProvaider = ({ children }) => {
  const { currentUser } = useAuth();
  const [words, setWords] = useState([]);
  const [wordsUser, setWordsUser] = useState([]);
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [isPageExplored, setPageExplored] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingUserWords, setLoadingUserWords] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getAllWordsUser();
      getWords();
    } else {
      getWords();
      setLoadingUserWords(false);
    }
  }, []);

  useEffect(() => {
    checkPageExplored(words, wordsUser);
  }, [words, wordsUser]);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getWords(groupSelect, pageSelect) {
    setLoading(true);
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
    } catch (e) {
      errorCatcher(e);
    }
  }

  async function getAllWordsUser() {
    try {
      const { content } = await userServisece.getWordsUser();
      setWordsUser(content);
      setLoadingUserWords(false);
      setLoading(false);
    } catch (e) {
      errorCatcher(error);
    }
  }

  async function removeWordUser(wordId) {
    try {
      userServisece.deleteWordUser(wordId);
      setWordsUser((prevState) =>
        prevState.filter((w) => w.wordId._id !== wordId)
      );
      setLoading(false);
    } catch {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  async function checkPageExplored(wordsPage, wordsUser) {
    const count = wordsPage.reduce((acc, w) => {
      wordsUser.forEach((wu) => {
        if (w.id === wu.wordId._id) {
          return (acc += 1);
        }
      });
      return acc;
    }, 0);
    return count === 20 ? setPageExplored(true) : setPageExplored(false);
  }
  return (
    <WordContext.Provider
      value={{
        isLoading,
        words,
        wordsUser,
        isLoadingUserWords,
        isPageExplored,
        getWords,
        getAllWordsUser,
        removeWordUser
      }}
    >
      {children}
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
