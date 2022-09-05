import React from "react";
import PropTypes from "prop-types";
import { BASE_PATH } from "../../../../constants";

const Game = ({ roundWords, onCheck, onSkipQuestion, correctPosition }) => {
  const spell = (type) => {
    const playWord = new Audio(
      `${BASE_PATH}/${roundWords[correctPosition][type]}`
    );
    playWord.playbackRate = 0.8;
    playWord.play();
  };

  return (
    <>
      <section className="d-flex justify-content-center">
        <button
          onClick={() => spell("audio")}
          type="button"
          title="Повторить слово"
          className="big_sound_button"
        >
          ♬
        </button>
        <button
          onClick={() => spell("audioExample")}
          type="button"
          title="Озвучить пример"
          className="small_sound_button"
        >
          ♬
        </button>
      </section>

      <section className="d-flex justify-content-center audio_game_words">
        {roundWords.map((word, index) => {
          return (
            <div key={word.id}>
              <button
                onClick={() => onCheck(word.right)}
                className="audiocall_word_button"
              >
                <span className="word_number">{index + 1}</span>{" "}
                {word.wordTranslate}{" "}
              </button>
            </div>
          );
        })}
      </section>

      <section className="text-center">
        <button
          onClick={onSkipQuestion}
          type="button"
          className="audiocall_button"
        >
          Пропустить
        </button>
      </section>
    </>
  );
};

Game.propTypes = {
  correctPosition: PropTypes.number,
  roundWords: PropTypes.array,
  onSkipQuestion: PropTypes.func,
  onCheck: PropTypes.func
};

export default Game;
