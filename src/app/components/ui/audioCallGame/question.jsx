import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Game from "./game";
import Answer from "./answer";

const Question = ({
  wordCounter,
  score,
  roundWords,
  onCheck,
  onSkipQuestion,
  correctPosition,
  onNextQuestion,
  view
}) => {
  useEffect(() => {
    document.addEventListener("keypress", onKeyPress, true);
    return () => {
      document.removeEventListener("keypress", onKeyPress, true);
    };
  }, [view]);

  const onKeyPress = (key) => {
    const correctAnswer = correctPosition + 1;
    switch (key.code) {
      case "Digit1":
        if (view === "game") onCheck(correctAnswer === 1);
        break;
      case "Digit2":
        if (view === "game") onCheck(correctAnswer === 2);
        break;
      case "Digit3":
        if (view === "game") onCheck(correctAnswer === 3);
        break;
      case "Digit4":
        if (view === "game") onCheck(correctAnswer === 4);
        break;
      case "Digit5":
        if (view === "game") onCheck(correctAnswer === 5);
        break;
      case "Enter":
        if (view === "answer_true" || view === "answer_false") {
          onNextQuestion();
        }
        break;
      case "Space":
        if (view === "game") {
          onSkipQuestion();
        }
        break;
    }
  };

  return (
    <div className="container audiocall_page">
      <div className="top_line">
        <h2 className="audio_call_name">Аудиовызов</h2>
      </div>
      <h4 className="audiocall_header_small">
        Вопрос {wordCounter + 1} из 5. Счет: {score}
      </h4>
      {view === "game" ? (
        <Game
          roundWords={roundWords}
          onCheck={onCheck}
          onSkipQuestion={onSkipQuestion}
          correctPosition={correctPosition}
        />
      ) : (
        <Answer
          isRight={view === "answer_true"}
          correctAnswer={roundWords[correctPosition]}
          onNextQuestion={onNextQuestion}
        />
      )}
    </div>
  );
};

Question.propTypes = {
  wordCounter: PropTypes.number,
  score: PropTypes.number,
  correctPosition: PropTypes.number,
  roundWords: PropTypes.array,
  onSkipQuestion: PropTypes.func,
  onCheck: PropTypes.func,
  onNextQuestion: PropTypes.func,
  view: PropTypes.string
};

export default Question;
