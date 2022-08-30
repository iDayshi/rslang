import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AudioButton from "../common/audioButton";
import { useAuth } from "../../hooks/useAuth";
import { useWord } from "../../hooks/useWords";
import userServisece from "../../services/user.service";

const CardWord = ({ word }) => {
  const { currentUser } = useAuth();
  const { wordsUser, removeWordUser } = useWord();
  const [difficultWord, setDifficultWord] = useState();
  // const [learnedWord, setLearnedWord] = useState();
  // const [studyStatus, setStudyStatus] = useState();

  useEffect(() => {
    const isDifficultWord = !!wordsUser.find(
      (wordDif) => wordDif.wordId.word === word.word
    );
    setDifficultWord(isDifficultWord);
  }, []);

  const handleWordDifficultyChange = (wordId) => {
    setDifficultWord(true);
    userServisece.addWordUser(wordId, "hard");
  };

  const handleWordDelete = (wordId) => {
    removeWordUser(wordId);
  };

  return (
    <>
      <div
        className={`card ${
          difficultWord ? "border border-3 border-danger" : ""
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
            {word.transcription || word.wordId.transcription}
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
                word.textExampleTranslate || word.wordId.textExampleTranslate
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
                word.textMeaningTranslate || word.wordId.textMeaningTranslate
            }}
          ></h6>
          <hr />
          {currentUser ? (
            difficultWord ? (
              <p className="text-danger border border-1 border-danger">
                Сложное слово
              </p>
            ) : (
              <button
                type="button"
                className={`btn ${word.wordId ? "btn-danger" : "btn-danger"} `}
                onClick={
                  word.wordId
                    ? () => handleWordDelete(word.wordId._id)
                    : () => handleWordDifficultyChange(word.id)
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
    </>
  );
};

CardWord.propTypes = {
  word: PropTypes.object
};

export default CardWord;
