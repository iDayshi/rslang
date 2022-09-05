import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AudioButton from "../../common/audioButton";
import { useAuth } from "../../../hooks/useAuth";
import { useWord } from "../../../hooks/useWords";
import userServisece from "../../../services/user.service";

const CardWord = ({ word }) => {
  const { currentUser } = useAuth();
  const { wordsUser, removeWordUser, addWordUser, isLoading } = useWord();
  const [wordsCurrentUser, setWordsCurrentUser] = useState(wordsUser);
  const [difficultWord, setDifficultWord] = useState(false);
  const [learnedWord, setLearnedWord] = useState(false);
  const [studyStatus, setStudyStatus] = useState(0);
  const [correctly, setCorrectly] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [optionalWord, setOptionalWord] = useState({});

  useEffect(() => {
    setWordsCurrentUser(wordsUser);
  }, [isLoading]);

  useEffect(() => {
    let wordUser = wordsCurrentUser.find(
      (wordDif) => wordDif.wordId.word === word.word
    );

    if (!wordUser && word.difficulty) {
      wordUser = word;
    }
    if (wordUser) {
      wordUser.difficulty === "hard"
        ? setDifficultWord(true)
        : setLearnedWord(wordUser.difficulty === "easy");
      setStudyStatus(Math.round((wordUser.optional.count / 5) * 100));
      setCorrectly(wordUser.optional.correctly);
      setWrong(wordUser.optional.wrong);
      setOptionalWord(wordUser.optional);
    }
  }, [wordsCurrentUser]);

  const handleWordTypeChange = (wordId, type, optionalParam) => {
    if (!Object.keys(optionalParam).length) {
      optionalParam = {
        count: 0,
        correctly: 0,
        wrong: 0
      };
    }
    if (type === "hard") {
      setDifficultWord(true);
      setStudyStatus(0);
      optionalParam.count = 0;
      if (learnedWord) {
        setLearnedWord(false);
        userServisece.updateWordUser(wordId, "hard", optionalParam);
      } else {
        addWordUser(wordId, "hard", optionalParam);
      }
    }
    if (type === "easy") {
      setLearnedWord(true);
      setStudyStatus(100);
      optionalParam.count = 5;
      if (difficultWord) {
        setDifficultWord(false);
        userServisece.updateWordUser(wordId, "easy", optionalParam);
      } else {
        addWordUser(wordId, "easy", optionalParam);
      }
    }
  };

  const handleWordDelete = (wordId) => {
    removeWordUser(wordId);
  };

  return (
    <section>
      <div className="container ">
        <div
          className="row align-items-center"
          style={{
            boxShadow: `0 0.5rem 1rem rgba${
              difficultWord
                ? "(255, 0, 0, 0.5)"
                : learnedWord
                ? "(6, 200, 80, 0.5)"
                : "(0, 0, 0, 0.2)"
            }`
          }}
        >
          <div className="col-10 col-sm-6 col-md-5 col-lg-4 m-auto pb-5 pb-md-0 ">
            <img
              alt="image"
              className="img-fluid rounded-0"
              src={`http://localhost:8080/${word.image || word.wordId.image}`}
            />
          </div>
          <div className="col-12 ml-md-auto col-md-7 col-lg-6 pb-5 pb-md-0 p-2">
            <h2 className="text-muted">
              <img
                alt="image"
                height="32"
                width="32"
                src="https://www.svgrepo.com/show/20589/book.svg"
              />{" "}
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
            </h2>
            {currentUser ? (
              <>
                <div className="d-flex justify-content-between px-md-1">
                  <div className="align-self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="green"
                      className="bi bi-plus-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                  </div>
                  <div className="text-end">
                    <h3 className="text-info">{correctly}</h3>
                    <p className="mb-0">Верных ответов</p>
                  </div>
                  <div className="align-self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="red"
                      className="bi bi-dash-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                    </svg>
                  </div>
                  <div className="text-end">
                    <h3 className="text-info">{wrong}</h3>
                    <p className="mb-0">Неверных ответов</p>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#DCDCDC"
                  }}
                  className="progress m-3 text-center"
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${studyStatus}%`,
                      backgroundColor: "#76CDD8",
                      color: "black"
                    }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {`   Прогресс: ${studyStatus}%`}
                  </div>
                  {!studyStatus ? `Прогресс: ${studyStatus}%` : ""}
                </div>
              </>
            ) : (
              ""
            )}

            <hr />
            <h6
              dangerouslySetInnerHTML={{
                __html: word.textExample || word.wordId.textExample
              }}
              className="lead"
            ></h6>
            <h6
              dangerouslySetInnerHTML={{
                __html:
                  word.textExampleTranslate || word.wordId.textExampleTranslate
              }}
              className="lead"
            ></h6>
            <hr />
            <h6
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: word.textMeaning || word.wordId.textMeaning
              }}
            ></h6>
            <h6
              className="card-text"
              dangerouslySetInnerHTML={{
                __html:
                  word.textMeaningTranslate || word.wordId.textMeaningTranslate
              }}
            ></h6>
            <p className="mt-4 d-flex align-items-center">
              {currentUser ? (
                !word.difficulty && difficultWord ? (
                  <button className="btn btn-danger" disabled>
                    Сложное слово
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`btn btn-danger`}
                    onClick={
                      word.difficulty === "hard"
                        ? () => handleWordDelete(word.wordId._id)
                        : () =>
                            handleWordTypeChange(word.id, "hard", optionalWord)
                    }
                  >
                    {word.difficulty === "hard"
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
              {currentUser && word.difficulty !== "hard" ? (
                learnedWord ? (
                  <button className="btn btn-success ms-2" disabled>
                    Слово изучено
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleWordTypeChange(word.id, "easy", optionalWord)
                    }
                    type="button"
                    className={`btn btn-success ms-2`}
                  >
                    {word.wordId ? "Изучено" : "Добавить в изученые слова"}
                  </button>
                )
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

CardWord.propTypes = {
  word: PropTypes.object
};

export default CardWord;
