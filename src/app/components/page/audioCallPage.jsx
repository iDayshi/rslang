import React, { useState, useEffect } from "react";
import { useAudioCall } from "../../hooks/useAudioCall";
import MenuGame from "../ui/audioCallGame/menuGame";
import Question from "../ui/audioCallGame/question";
import Result from "../ui/audioCallGame/result";

const AudioCallPage = () => {
  const {
    wordsGame,
    wordsGameDictionary,
    setWordsGame,
    setWordsGameDictionary,
    setLoading
  } = useAudioCall();
  const [quizWords, setQuizWords] = useState([]);
  const [correctPosition, setCorrectPosition] = useState(0);
  const [nextRound, setNextRound] = useState(false);
  const [score, setScore] = useState(0);
  const [series, setSeries] = useState(0);
  const [strick, setStrick] = useState(0);
  const [wordCounter, setWordCounter] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isPlayGame, setPlayGame] = useState(false);
  const [view, setView] = useState("game");

  useEffect(() => {
    if (nextRound && wordCounter < 5) {
      setView("game");
      setNextRound(!nextRound);
      setWordCounter(wordCounter + 1);
      if (wordCounter < 4) {
        makeWords();
      }
    }
    if (wordCounter === 5) {
      setView("result");
      setWordCounter(0);
      setQuizWords([]);
      setWordsGame([]);
      setWordsGameDictionary([]);
      setLoading(true);
    }
  }, [nextRound]);

  const newGame = () => {
    setPlayGame(!isPlayGame);
  };

  const skipQuestion = () => {
    setView("answer_false");
    if (series < strick) {
      setSeries(strick);
    }
    setStrick(0);
    setWrongAnswers([...wrongAnswers, quizWords[correctPosition]]);
  };

  const nextQuestion = () => {
    setNextRound(!nextRound);
  };

  const handleCheck = async (isTrue) => {
    if (isTrue) {
      setScore(score + 1);
      setStrick(strick + 1);
      setView("answer_true");
      if (wordCounter === 4) {
        setSeries(strick + 1);
      }
      setCorrectAnswers([...correctAnswers, quizWords[correctPosition]]);
    } else {
      setView("answer_false");
      if (series < strick) {
        setSeries(strick);
      }
      setStrick(0);
      setWrongAnswers([...wrongAnswers, quizWords[correctPosition]]);
    }
  };

  const makeWords = () => {
    const quizWordsState = wordsGameDictionary.length
      ? wordsGameDictionary.sort(() => Math.random() - 0.5).slice(0, 5)
      : wordsGame.sort(() => Math.random() - 0.5).slice(0, 5);
    const rightWordPosition = Math.floor(Math.random() * 5);
    setCorrectPosition(rightWordPosition);
    quizWordsState[rightWordPosition].right = true;
    setQuizWords(quizWordsState);
    const playWord = new Audio(
      `http://localhost:8080/${quizWordsState[rightWordPosition].audio}`
    );
    playWord.play();
  };

  const startGame = () => {
    setPlayGame(!isPlayGame);
    setView("game");
    setScore(0);
    setSeries(0);
    setStrick(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    makeWords();
  };

  return isPlayGame ? (
    view === "result" ? (
      <Result
        correctAnswers={correctAnswers}
        score={score}
        wrongAnswers={wrongAnswers}
        newGame={newGame}
        series={series}
      />
    ) : (
      <Question
        score={score}
        wordCounter={wordCounter}
        roundWords={quizWords}
        onSkipQuestion={skipQuestion}
        onCheck={handleCheck}
        correctPosition={correctPosition}
        onNextQuestion={nextQuestion}
        view={view}
      />
    )
  ) : (
    <MenuGame onStart={startGame} check={!!wordsGameDictionary.length} />
  );
};

export default AudioCallPage;
