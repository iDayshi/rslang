import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import wordServisece from "../services/word.service";
import { toast } from "react-toastify";

const WordContext = React.createContext();

export const useWord = () => {
  return useContext(WordContext);
};

const WordProvaider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWords();
    console.log("11");
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

  async function getWords() {
    try {
      const { content } = await wordServisece.get();
      setWords(content);
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
    <WordContext.Provider value={{ words, getWordsById }}>
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
