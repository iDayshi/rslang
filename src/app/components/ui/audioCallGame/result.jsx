import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useStatistic } from "../../../hooks/useStatistic";
import { useAuth } from "../../../hooks/useAuth";
import { BASE_PATH } from "../../../../constants";

const Result = ({ correctAnswers, score, wrongAnswers, newGame, series }) => {
  const { updateStatistics } = useStatistic();
  const { currentUser } = useAuth();
  const percentage = Math.floor((100 * correctAnswers.length) / 10);
  useEffect(() => {
    if (currentUser) {
      updateStatistics("gamesAudioCall", 10, score, percentage);
    }
  }, [correctAnswers]);

  return (
    <div className="container">
      <div className="top_line">
        <h2 className="audio_call_name">Аудиовызов</h2>
      </div>
      <section className="audiocoll_results">
        <h3 className="audiocall_header"> Результаты игры </h3>
        <div>
          {percentage} % правильных ответов. {correctAnswers.length} из 10 слов
          верны
        </div>
        <div>{series + " правильных ответов подряд"}</div>
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
        <button onClick={newGame} type="button" className="audiocall_button">
          Начать игру
        </button>
      </section>
    </div>
  );
};

Result.propTypes = {
  correctAnswers: PropTypes.array,
  wrongAnswers: PropTypes.array,
  newGame: PropTypes.func,
  series: PropTypes.number,
  score: PropTypes.number
};

export default Result;
