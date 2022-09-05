import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useStatistic } from "../../../hooks/useStatistic";
import { useAuth } from "../../../hooks/useAuth";
import { BASE_PATH } from "../../../../constants";

const ResultSprint = ({
  correctAnswers,
  wrongAnswers,
  getResultPhrase,
  score,
  allAnswers
}) => {
  const { updateStatistics } = useStatistic();
  const { currentUser } = useAuth();
  const percentage = Math.floor((100 * correctAnswers.length) / allAnswers);

  useEffect(() => {
    if (currentUser) {
      updateStatistics("gamesSprint", allAnswers, score, percentage);
    }
  }, [correctAnswers]);

  return (
    <div className="card-container d-flex flex-column justify-content-around align-items-center">
      <div className="card col-xs-12 col-sm-6 col-md-4 w-100">
        <h1>
          Ваш счёт: {score} - {getResultPhrase()}
        </h1>
        <h5>
          Во время игры было использованно {allAnswers} слов.{" "}
          {correctAnswers.length} слов(а) были верны, процент верных ответов{" "}
          {percentage || 0} %
        </h5>
        <div>
          <h4 className="audiocall_header_small">Правильные ответы:</h4>
          {correctAnswers.map((word) => {
            return (
              <div key={word.id}>
                <button
                  onClick={() => {
                    const playWord = new Audio(`${BASE_PATH}/${word.audio}`);
                    playWord.play();
                  }}
                  className="btn btn-success m-2"
                >
                  ♬
                </button>
                <span>
                  {" "}
                  {word.word}
                  {" - "}
                  {word.wordTranslate}
                </span>
              </div>
            );
          })}
          <h4 className="audiocall_header_small">Ошибки:</h4>
          {wrongAnswers.map((word) => {
            return (
              <div key={word.id}>
                <button
                  onClick={() => {
                    const playWord = new Audio(`${BASE_PATH}/${word.audio}`);
                    playWord.play();
                  }}
                  className="btn btn-danger m-2"
                >
                  ♬
                </button>
                <span>
                  {" "}
                  {word.word}
                  {" - "}
                  {word.wordTranslate}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ResultSprint.propTypes = {
  correctAnswers: PropTypes.array,
  wrongAnswers: PropTypes.array,
  getResultPhrase: PropTypes.func,
  series: PropTypes.number,
  score: PropTypes.number,
  allAnswers: PropTypes.number
};

export default ResultSprint;
