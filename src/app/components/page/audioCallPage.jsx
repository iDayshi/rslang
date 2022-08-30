import React, { useState, useEffect } from "react";
import { useWord } from "../../hooks/useWords";
import GroupWords from "../groupWords";

const AudioCallPage = () => {
  const { words, getWords } = useWord();
  const [quizWords, setQuizWords] = useState([]);
  const [correctPosition, setCorrectPosition] = useState();
  const [nextRound, setNextRound] = useState(false);
  const [score, setScore] = useState(0);
  const [wordCounter, setWordCounter] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [view, setView] = useState("level");

  useEffect(() => {
    getWords(0, Math.random() * 29);
  }, []);

  useEffect(() => {
    if ((nextRound) && (wordCounter < 20)) {
      makeWords();
      setWordCounter(wordCounter + 1);
      setNextRound(!nextRound);
    }
    if (wordCounter === 20) {
      setWordCounter(0);
      setView("results");
    }
  }, [nextRound]);

  useEffect(() => {
    document.addEventListener("keypress", onKeypress);
    return () => {
      document.removeEventListener("keypress", onKeypress);
    };
  }, []);

  const onKeypress = (key) => {
    switch (key.code) {
      case "Digit1":
        ((correctPosition + 1) === 1) ? handleCheck(true) : handleCheck(false);
        console.log(correctPosition + "1");
        break;
      case "Digit2":
        ((correctPosition + 1) === 2) ? handleCheck(true) : handleCheck(false);
        console.log(correctPosition + "2");
        break;
      case "Digit3":
        ((correctPosition + 1) === 3) ? handleCheck(true) : handleCheck(false);
        console.log(correctPosition + "3");
        break;
      case "Digit4":
        ((correctPosition + 1) === 4) ? handleCheck(true) : handleCheck(false);
        console.log(correctPosition + "4");
        break;
      case "Digit5":
        ((correctPosition + 1) === 5) ? handleCheck(true) : handleCheck(false);
        console.log(correctPosition + "5");
        break;
      case "Enter":
        nextQuestion();
        break;
      case "Space":
        skipQuestion();
        break;
    }
  };

  const spellWord = () => {
    const playWord = new Audio(`http://localhost:8080/${quizWords[correctPosition].audio}`);
    playWord.play();
  };

  const spellSentense = () => {
    const playWord = new Audio(`http://localhost:8080/${quizWords[correctPosition].audioExample}`);
    playWord.play();
  };

  const skipQuestion = () => {
    setWrongAnswers([...wrongAnswers, quizWords[correctPosition]]);
    setView("wrong_answer");
  };

  const nextQuestion = () => {
    setNextRound(!nextRound);
    setView("question");
  };

  const handleCheck = (isTrue) => {
    isTrue
      ? setView("correct_answer")
      : setView("wrong_answer");
    isTrue ? setScore(score + 1) : setScore(score);
    isTrue ? setCorrectAnswers([...correctAnswers, quizWords[correctPosition]]) : setWrongAnswers([...wrongAnswers, quizWords[correctPosition]]);
  };

  const makeWords = () => {
    const wordsArr = words;
    const quizWords1 = wordsArr.sort(() => Math.random() - 0.5).slice(0, 5);
    const rightWordPosition = Math.floor(Math.random() * 5);
    setCorrectPosition(rightWordPosition);
    console.log(correctPosition);
    quizWords1.forEach(el => { el.right = false; });
    quizWords1[rightWordPosition].right = true;
    setQuizWords(quizWords1);
    const playWord = new Audio(
      `http://localhost:8080/${quizWords1[rightWordPosition].audio}`
    );
    playWord.play();
  };

  const startGame = () => {
    setView("question");
    setScore(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    makeWords();
  };

  const handleGroupChange = (groupIndex) => {
    getWords(groupIndex, Math.random() * 30);
  };

  if (view === "level") {
    return (
    <div className="container audiocall_page">
    <div className="top_line">
      <h2 className="audio_call_name">Аудиовызов</h2>
      <button type="button" className="btn-close" aria-label="Close"></button>
    </div>

    <section className="text-center white_bcg">
      <h4 className="audiocall_header">Выберите уровень</h4>
      <GroupWords onGroupChange={handleGroupChange} />
      <button onClick={startGame} type="button" className="audiocall_button">
        Начать игру
      </button>
    </section>
  </div>);
  }

  if (view === "question") {
    return (
    <div className="container audiocall_page">
    <div className="top_line">
      <h2 className="audio_call_name">Аудиовызов</h2>
      <button type="button" className="btn-close" aria-label="Close"></button>
    </div>
    <h4 className="audiocall_header_small">Вопрос {wordCounter + 1} из 20. Счет: {score}</h4>

    <section className="d-flex justify-content-center">
      <button onClick={spellWord} type="button" title="Повторить слово" className="big_sound_button">
        ♬
      </button>
      <button onClick={spellSentense} type="button" title="Озвучить пример" className="small_sound_button">
        ♬
      </button>
    </section>

    <section className="d-flex justify-content-center audio_game_words">
      {quizWords.map((word) => {
        return (
          <div key={word.id}>
            <button onClick={() => handleCheck(word.right)} className="audiocall_word_button">
              {" "}{word.wordTranslate}{" "}
            </button>
          </div>
        );
      })}
    </section>

    <section className="text-center">
      <button onClick={skipQuestion} type="button" className="audiocall_button">
        Пропустить
      </button>
    </section>

  </div>);
  }

  if (view === "wrong_answer") {
    return (
      <div className="container audiocall_page">
      <div className="top_line">
        <h2 className="audio_call_name">Аудиовызов</h2>
        <button type="button" className="btn-close" aria-label="Close"></button>
      </div>
      <h4 className="audiocall_header_small">Вопрос {wordCounter + 1} из 20. Счет: {score}</h4>

      <h3 className="audiocall_wrong_header">🦄 Неверно</h3>

      <section>
        <div className="audiocall_wordcard">
          <img
            className="audiocall_word_img"
            src={`http://localhost:8080/${quizWords[correctPosition].image}`}
            alt={quizWords[correctPosition].word} />
          <div>
            <button
              onClick={() => {
                const playWord = new Audio(`http://localhost:8080/${quizWords[correctPosition].audio}`);
                playWord.play();
              } }
              className="btn btn-light m-2"
            >
              ♬
            </button>
            <span>{" "}{quizWords[correctPosition].word}{" - "}{quizWords[correctPosition].wordTranslate}</span>
          </div>
          <button onClick={nextQuestion} type="button" className="audiocall_button">
            Следующий вопрос
          </button>
        </div>
      </section>

    </div>
    );
  }

  if (view === "correct_answer") {
    return (
    <div className="container audiocall_page">
      <div className="top_line">
        <h2 className="audio_call_name">Аудиовызов</h2>
        <button type="button" className="btn-close" aria-label="Close"></button>
      </div>
      <h4 className="audiocall_header_small">Вопрос {wordCounter + 1} из 20. Счет: {score}</h4>

      <h3 className="audiocall_correct_header">🌈 Правильно! </h3>

      <section>
        <div className="audiocall_wordcard">
          <img
            className="audiocall_word_img"
            src={`http://localhost:8080/${quizWords[correctPosition].image}`}
            alt={quizWords[correctPosition].word} />
          <div>
            <button
              onClick={() => {
                const playWord = new Audio(`http://localhost:8080/${quizWords[correctPosition].audio}`);
                playWord.play();
              } }
              className="btn btn-light m-2"
            >
              ♬
            </button>
            <span>{" "}{quizWords[correctPosition].word}{" - "}{quizWords[correctPosition].wordTranslate}</span>
          </div>
          <button onClick={nextQuestion} type="button" className="audiocall_button">
            Следующий вопрос
          </button>
        </div>
      </section>

    </div>
    );
  }

  if (view === "results") {
    return (
      <div className="container">
        <div className="top_line">
        <h2 className="audio_call_name">Аудиовызов</h2>
        <button type="button" className="btn-close" aria-label="Close"></button>
      </div>

      <section className="audiocoll_results">
        <h3 className="audiocall_header"> Результаты игры </h3>
        <div>{Math.floor(100 * correctAnswers.length / 20)} % правильных ответов. {score} из 20 слов верны</div>
        <div>
        <h4 className="audiocall_header_small">Правильные ответы:</h4>
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
        <h4 className="audiocall_header_small">Ошибки:</h4>
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
        </div>
        <button onClick={startGame} type="button" className="audiocall_button">
          Начать игру
        </button>
      </section>
    </div>
    );
  }
};

export default AudioCallPage;
