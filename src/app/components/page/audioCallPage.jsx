import React, { useEffect, useState } from "react";
import { useWord } from "../../hooks/useWords";

const AudioCallPage = () => {
  const { words, getWords } = useWord();
  const [rightWord, setRightWord] = useState();
  const [quizWords, setQuizWords] = useState([]);
  useEffect(() => {
    getWords(0, 0);
    makeWords();
  }, []);
  useEffect(() => {
    setRightWord(rightWord);
  }, [rightWord]);
  const spellWord = async () => {
    alert("sound");
  };
  const skipQuestion = () => {
    alert("NextWord");
  };
  const makeWords = () => {
    const wordsArr = words;
    // const rightWord = { word: "enjoy" };
    const rightWordPosition = Math.floor(Math.random() * 5);
    const quizWords1 = wordsArr.sort(() => Math.random() - 0.5).slice(0, 4);
    quizWords1.splice(rightWordPosition, 0, rightWord);
    console.log(quizWords1);
    setQuizWords(quizWords1);
  };

  return (
    <div className="container">
      <div className="row gutters-sm">
        <h1>Аудиовызов</h1>
      </div>
      <div>
        <button type="button" className="btn-close" aria-label="Close"></button>
      </div>
      <button onClick={spellWord} type="button" className="btn btn-info mb-5">
        ♬
      </button>
      <button onClick={makeWords} type="button" className="btn btn-info mb-5">
        Создать слова
      </button>
      <section className="words-row">
        {
          (quizWords.map((word) => {
            setRightWord(word);
            return (
              <div key={word.id}>
                <span className="tanslation"> {word.wordTranslate} </span>
              </div>
            );
          }))
        }
      </section>
      <button onClick={skipQuestion} type="button" className="btn btn-info mb-5">
        Пропустить
      </button>
    </div>
  );
};

export default AudioCallPage;

/*
import React, { useState } from "react";
import { useWord } from "../../hooks/useWords";
import GroupWords from "../groupWords";
import Pagination from "../pagination";
import CardWord from "../ui/cardsWord";

const DictionaryPage = () => {
  const { words, getWords } = useWord();
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    getWords(currentGroup, Number(pageIndex) - 1);
  };

  const handleGroupChange = (groupIndex) => {
    setCurrentPage(1);
    setCurrentGroup(groupIndex);
    getWords(groupIndex, 0);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center m-5">
      <h1 className="text-center">Учебник</h1>
      <GroupWords onGroupChange={handleGroupChange} />
      <div className="row gutters-sm w-100">
        <div className="container ">
          <div className="card-deck row">
            <CardWord selectWords={words} />
          </div>
        </div>
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

*/
