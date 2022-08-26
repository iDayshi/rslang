import React from "react";
import PropTypes from "prop-types";
import AudioButton from "../common/audioButton";
import { useAuth } from "../../hooks/useAuth";
import userServisece from "../../services/user.service";
import { useWord } from "../../hooks/useWords";

const CardWord = ({ selectWords }) => {
  const { currentUser } = useAuth();
  const { wordsUser } = useWord();

  const handleWordDifficultyChange = (wordId) => {
    userServisece.addWordUser(wordId);
  };

  console.log(selectWords);
  console.log(wordsUser);

  return (
    <>
      {selectWords.map((word) => (
        <div key={word.id} className="col-xs-12 col-sm-6 col-md-4 w-25 mb-3">
          <div
            className={`card ${
              wordsUser.find((wordDif) => wordDif.wordId.word === word.word)
                ? "border border-3 border-danger"
                : ""
            }`}
          >
            <div className="view overlay">
              <img
                className="card-img-top mh-20"
                style={{
                  maxHeight: "283.828px "
                }}
                src={`http://localhost:8080/${word.image || word.wordId.image}`}
                alt={word.word || word.wordId.word}
              />
              <a href="#!">
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>

            <div className="card-body text-center">
              <h5 className="card-title ">
                {word.word || word.wordId.word}{" "}
                <i
                  style={{
                    color: "#76CDD8"
                  }}
                  className="bi bi-chevron-compact-left"
                ></i>
                {word.transcription}
                <i
                  style={{
                    color: "#76CDD8"
                  }}
                  className="bi bi-chevron-compact-right"
                ></i>{" "}
                {word.wordTranslate || word.wordId.wordTranslate}
              </h5>
              <hr />
              <h6
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html: word.textExample || word.wordId.textExample
                }}
              ></h6>
              <br />
              <h6
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html:
                    word.textExampleTranslate ||
                    word.wordId.textExampleTranslate
                }}
              ></h6>
              <hr />
              <h6
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html: word.textMeaning || word.wordId.textMeaning
                }}
              ></h6>
              <br />
              <h6
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html:
                    word.textMeaningTranslate ||
                    word.wordId.textMeaningTranslate
                }}
              ></h6>
              <hr />
              {currentUser ? (
                wordsUser.find(
                  (wordDif) => wordDif.wordId.word === word.word
                ) ? (
                  <p className="text-danger border border-1 border-danger">
                    Сложное слово
                  </p>
                ) : (
                  <button
                    type="button"
                    className={`btn ${
                      word.wordId ? "btn-danger" : "btn-danger"
                    } `}
                    onClick={() =>
                      handleWordDifficultyChange(word.id || word.wordId._id)
                    }
                  >
                    {word.wordId
                      ? "Удалить из сложных слов"
                      : "Добавить в сложные слова"}
                  </button>
                )
              ) : (
                ""
              )}
              <AudioButton
                urls={[
                  word.audio || word.wordId.audio,
                  word.audioExample || word.wordId.audioExample,
                  word.audioMeaning || word.wordId.audioMeaning
                ]}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

CardWord.propTypes = {
  selectWords: PropTypes.array
};

export default CardWord;
