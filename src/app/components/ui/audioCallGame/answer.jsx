import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useWord } from "../../../hooks/useWords";

const Answer = ({ isRight, correctAnswer, onNextQuestion }) => {
  const { gameResultsCheck } = useWord();
  delete correctAnswer.right;

  useEffect(() => {
    if (correctAnswer) {
      gameResultsCheck(correctAnswer, isRight);
    }
  }, []);

  return (
    <>
      <h3
        className={
          isRight ? "audiocall_correct_header" : "audiocall_wrong_header"
        }
      >
        {isRight ? "🌈 Правильно!" : " ☁️ Неверно"}
      </h3>
      <section>
        <div className="audiocall_wordcard">
          <img
            className="audiocall_word_img"
            src={`http://localhost:8080/${correctAnswer.image}`}
            alt={correctAnswer.word}
          />
          <div>
            <button
              onClick={() => {
                const playWord = new Audio(
                  `http://localhost:8080/${correctAnswer.audio}`
                );
                playWord.play();
              }}
              className="btn btn-light m-2"
            >
              ♬
            </button>
            <span>
              {" "}
              {correctAnswer.word}
              {" - "}
              {correctAnswer.wordTranslate}
            </span>
          </div>
          <button
            onClick={onNextQuestion}
            type="button"
            className="audiocall_button"
          >
            Следующий вопрос
          </button>
        </div>
      </section>
    </>
  );
};

Answer.propTypes = {
  isRight: PropTypes.bool,
  correctAnswer: PropTypes.object,
  onNextQuestion: PropTypes.func
};

export default Answer;
