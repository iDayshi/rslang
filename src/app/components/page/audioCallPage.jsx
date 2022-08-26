import React, { useState, useEffect } from "react";
import { useWord } from "../../hooks/useWords";
import { toast } from "react-toastify";

import GroupWords from "../groupWords";

const AudioCallPage = () => {
  const { words, getWords } = useWord();
  const [quizWords, setQuizWords] = useState([]);
  const [nextRound, setNextRound] = useState(false);
  const [score, setScore] = useState(0);
  const [wordCounter, setWordCounter] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  useEffect(() => {
    getWords(0, 0);
  }, []);

  useEffect(() => {
    if ((nextRound) && (wordCounter < 20)) {
      makeWords();
      setWordCounter(wordCounter + 1);
      setNextRound(!nextRound);
    }
    if (wordCounter === 20) {
      alert("Good job! Your score " + score);
      setScore(0);
    }
  }, [nextRound]);

  const spellWord = () => {
    quizWords.forEach((word) => {
      if (word.right) {
        const playWord = new Audio(`http://localhost:8080/${word.audio}`);
        playWord.play();
      }
    });
  };

  const skipQuestion = () => {
    setNextRound(!nextRound);
  };

  const handleCheck = (isTrue, word) => {
    isTrue
      ? toast.success("🦄 Правильно", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      : toast.error("🦄 Неверно", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
    isTrue ? setScore(score + 1) : setScore(score);
    let correctWord;
    quizWords.forEach((word) => {
      if (word.right) {
        correctWord = word;
      }
    });
    isTrue ? setCorrectAnswers([...correctAnswers, correctWord]) : setWrongAnswers([...wrongAnswers, correctWord]);
    setNextRound(!nextRound);
  };

  const makeWords = () => {
    const wordsArr = words;
    const quizWords1 = wordsArr.sort(() => Math.random() - 0.5).slice(0, 5);
    const rightWordPosition = Math.floor(Math.random() * 5);
    quizWords1.forEach(el => { el.right = false; });
    quizWords1[rightWordPosition].right = true;
    setQuizWords(quizWords1);
    const playWord = new Audio(
      `http://localhost:8080/${quizWords1[rightWordPosition].audio}`
    );
    playWord.play();
  };

  const handleGroupChange = (groupIndex) => {
    getWords(groupIndex, Math.random() * 30);
    console.log(groupIndex);
  };

  return (
    <div className="container">
      <div className="row gutters-sm">
        <h1>Аудиовызов</h1>
      </div>
      <div>
        <button type="button" className="btn-close" aria-label="Close"></button>
      </div>
      <h2>Score: {score}</h2>
      <button onClick={spellWord} type="button" className="btn btn-info m-2">
        ♬
      </button>
      <button onClick={makeWords} type="button" className="btn btn-info m-2">
        Начать игру
      </button>
      <section className="d-flex words-row">
        {quizWords.map((word) => {
          return (
            <div key={word.id}>
              <button
                onClick={() => handleCheck(word.right)}
                className="btn btn-warning m-1"
              >
                {" "}
                {word.wordTranslate}{" "}
              </button>
            </div>
          );
        })}
      </section>
      <button
        onClick={skipQuestion}
        type="button"
        className="btn btn-info m-2"
      >
        Пропустить
      </button>
      <section className="results">
        <h3>Правильные ответы:</h3>
        {correctAnswers.map((word) => {
          return (
            <div key={word.id}>
              <button
                onClick={() => {
                  const playWord = new Audio(`http://localhost:8080/${word.audio}`);
                  playWord.play();
                }}
                className="btn btn-success m-2"
                >
                ♬
              </button>
              <span>{" "}{word.word}{" - "}{word.wordTranslate}</span>
            </div>
          );
        })}
        <h3>Ошибки:</h3>
        {wrongAnswers.map((word) => {
          return (
            <div key={word.id}>
              <button
                onClick={() => {
                  const playWord = new Audio(`http://localhost:8080/${word.audio}`);
                  playWord.play();
                }}
                className="btn btn-danger m-2"
              >
                ♬
              </button>
              <span>{" "}{word.word}{" - "}{word.wordTranslate}</span>
            </div>
          );
        })}
      </section>
      <section>
        <h3>Изменить сложность</h3>
        <GroupWords onGroupChange={handleGroupChange} />
      </section>
    </div>
  );
};

export default AudioCallPage;
