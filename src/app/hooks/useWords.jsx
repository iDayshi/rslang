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
      getWords(group, page);
    } else {
      getWords(group, page);
      setWordsUser([]);
      setLoadingUserWords(false);
    }
  }, [currentUser]);

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
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getAllWordsUser() {
    try {
      const { content } = await userServisece.getWordsUser();
      setWordsUser(content);
      setLoadingUserWords(false);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function addWordUser(wordId, type, optionalParam) {
    try {
      userServisece.addWordUser(wordId, type, optionalParam);
      getAllWordsUser();
      setLoading(false);
    } catch (error) {
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
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function gameResultsCheck(wordGame, isRight) {
    try {
      const checkWord = wordsUser.find((w, i) => {
        return w.wordId._id === wordGame.id;
      });

      if (checkWord) {
        const param = {
          count:
            checkWord.optional.count === 5
              ? checkWord.optional.count
              : isRight
              ? checkWord.optional.count + 1
              : (checkWord.optional.count = 0),
          correctly: isRight
            ? checkWord.optional.correctly + 1
            : checkWord.optional.correctly,
          wrong: isRight
            ? checkWord.optional.wrong
            : checkWord.optional.wrong + 1
        };
        if (param.count === 5 && isRight) {
          checkWord.difficulty = "easy";
        }
        if (param.count === 5 && !isRight) {
          param.count = 0;
          checkWord.difficulty = "midle";
        }
        await userServisece.updateWordUser(
          wordGame.id,
          checkWord.difficulty,
          param
        );
        getAllWordsUser();
      } else {
        const param = {
          count: isRight ? 1 : 0,
          correctly: isRight ? 1 : 0,
          wrong: isRight ? 0 : 1
        };
        userServisece.addWordUser(wordGame.id, "midle", param);
        getAllWordsUser();
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function checkPageExplored(wordsPage, wordsUser) {
    const count = wordsPage.reduce((acc, w) => {
      wordsUser.forEach((wu) => {
        if (w.id === wu.wordId._id) {
          if (wu.difficulty === "easy" || wu.difficulty === "hard") {
            return (acc += 1);
          }
        }
      });
      return acc;
    }, 0);
    return count === 20 ? setPageExplored(true) : setPageExplored(false);
  }

  function errorCatcher(error) {
    const { statusText } = error.response;
    setError(statusText);
  }

  return (
    <WordContext.Provider
      value={{
        group,
        isLoading,
        words,
        wordsUser,
        isLoadingUserWords,
        isPageExplored,
        getWords,
        getAllWordsUser,
        removeWordUser,
        gameResultsCheck,
        addWordUser
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
