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
  const [usedWords, setUsedWords] = useState([]);

  useEffect(() => {
    getWords(0, Math.random() * 30);
  }, []);

  useEffect(() => {
    if (wordCounter === 0) {
      let arr = words;
      arr = arr.sort(() => Math.random() - 0.5);
      setUsedWords(arr); // перед началом игры формируем массив слов, перемешиваем его, потом будем брать последовательно по одному слову из него, индекс правильного слова будет соответствовать носеру раунда игры
    }
    if ((nextRound) && (wordCounter < 20)) {
      makeWords();
      setWordCounter(wordCounter + 1);
      setNextRound(!nextRound);
    }
    if (wordCounter === 20) {
      alert("Good job! " + Math.floor(100 * correctAnswers.length / 20) + " % correct. Your score " + score);
      setScore(0);
      setWordCounter(0);
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

  const spellSentense = () => {
    quizWords.forEach((word) => {
      if (word.right) {
        const playWord = new Audio(`http://localhost:8080/${word.audioExample}`);
        playWord.play();
      }
    });
  };

  const skipQuestion = () => {
    setWordCounter(wordCounter + 1);
    let correctWord;
    quizWords.forEach((word) => {
      if (word.right) {
        correctWord = word;
      }
    });
    setWrongAnswers([...wrongAnswers, correctWord]);
    setNextRound(!nextRound);
  };

  const handleCheck = (isTrue) => {
    isTrue
      ? toast.success("🌈 Правильно", {
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
    const rightWordPosition = Math.floor(Math.random() * 5);
    const currentRoundWords = wordsArr.sort(() => Math.random() - 0.5).slice(0, 5); // создаем пять случайных слов из массива всех слов
    for (let i = 0; i < 5; i++) {
      if (i === rightWordPosition) { // на "правильную" позицию помещаем "правильное" слово
        setQuizWords([...quizWords, usedWords[wordCounter]]);
      } else if (currentRoundWords[i].id !== usedWords[wordCounter].id) { // на остальные позиции помещаем слова из currentRoundWords, если они не равны правильному
        setQuizWords([...quizWords, currentRoundWords[i]]);
      }
    }
    quizWords.forEach(el => { el.right = false; });
    quizWords[rightWordPosition].right = true;
    const playWord = new Audio(
      `http://localhost:8080/${usedWords[wordCounter].audio}`
    );
    playWord.play();
    console.log(quizWords);
  };

  const startGame = () => {
    setScore(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    makeWords();
  };

  const handleGroupChange = (groupIndex) => {
    getWords(groupIndex, Math.random() * 30);
  };

  return (
    <div className="container">
      <div className="row gutters-sm">
        <h1>Аудиовызов</h1>
      </div>
      <div>
        <button type="button" className="btn-close" aria-label="Close"></button>
      </div>
      <h4>Score: {score}</h4>
      <section className="text-center">
        <h4>Сложность</h4>
        <GroupWords onGroupChange={handleGroupChange} />
        <button onClick={startGame} type="button" className="btn btn-info m-2">
          Начать игру
        </button>
      </section>

      <section className="d-flex justify-content-center">
        <button onClick={spellWord} type="button" title="Повторить слово" className="btn btn-info btn-lg m-2">
          ♬
        </button>
        <button onClick={spellSentense} type="button" title="Озвучить пример" className="btn btn-info btn-sm m-2">
          ♬
        </button>
      </section>

      <section className="d-flex justify-content-center">
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

      <section className="text-center">
        <button
          onClick={skipQuestion}
          type="button"
          className="btn btn-info m-2"
        >
          Пропустить
        </button>
      </section>

      <section>
        {quizWords.map(function (word) {
            return (
                <div key={`${word.id}A`}>
                  <img
                    src={`http://localhost:8080/${word.image}`}
                    alt={word.word} />
                  <button
                    onClick={() => {
                      const playWord = new Audio(`http://localhost:8080/${word.audio}`);
                      playWord.play();
                    } }
                    className="btn btn-light m-2"
                  >
                    ♬
                  </button>
                  <span>{" "}{word.word}{" - "}{word.wordTranslate}</span>
                </div>
              );
          })
        }
      </section>

      <section className="results">
        <h4>Правильные ответы:</h4>
        {correctAnswers.map((word) => {
          return (
            <div key={`${word.id}C`}>
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
        <h4>Ошибки:</h4>
        {wrongAnswers.map((word) => {
          return (
            <div key={`${word.id}M`}>
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
    </div>
  );
};

export default AudioCallPage;
