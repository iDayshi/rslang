import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SprintCountdown from "./sprintCountdown";
import SprintTimer from "./sprintTimer";

import rightSound from "./sounds/right.mp3";
import wrongSound from "./sounds/wrong.mp3";
import finishSound from "./sounds/finish.mp3";

const SprintCardWord = ({ selectWords, onStart, check }) => {
  const [countdown, setCountdown] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFakeIndex, setIsFakeIndex] = useState(false);
  const [translationIndex, setTranslationIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [allAnswers, setAllAnswers] = useState(0);
  const [allRigthAnswers, setAllRightAnswers] = useState(0);
  const [scoreCoeff, setScoreCoeff] = useState(1);
  const [statusIcon, setRightIcon] = useState(
    "bi bi-question-circle-fill text-center col"
  );
  const [finished, setFinished] = useState(false);
  const [rigthAnswers, setRigthAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const resultPhrases = ["Keep going!", "Not Bad!!", "Awesome!!!"]; // set final result phrase
  const getResultPhrase = () => {
    playFinish();
    if (score < 10) {
      return resultPhrases[0];
    } else if (score < 50) {
      return resultPhrases[1];
    } else return resultPhrases[2];
  };

  (function () {
    setTimeout(() => {
      setCountdown(true); // hide countdown
    }, 3500);
    setTimeout(() => {
      setFinished(true); // hide main card and show result
      setCountdown(true); //
    }, 63500);
  })();

  // random choosing true or fake translation
  const defineIsFake = () => {
    const isfake = Math.floor(Math.random() * 2);
    setIsFakeIndex(!!isfake);
  };

  const playRight = () => {
    new Audio(rightSound).play();
  };

  const playWrong = () => {
    new Audio(wrongSound).play();
  };

  const playFinish = () => {
    new Audio(finishSound).play();
  };

  const commonButtonAction = () => {
    const fakeTranslationIndex = Math.floor(Math.random() * 599);

    setCardIndex(cardIndex + 1);
    defineIsFake();
    setAllAnswers(allAnswers + 1);

    isFakeIndex
      ? setTranslationIndex(fakeTranslationIndex)
      : setTranslationIndex(cardIndex + 1);
  };

  const wrongButtonAction = () => {
    if (cardIndex !== translationIndex) {
      if (scoreCoeff < 3) {
        setScoreCoeff(scoreCoeff + 1);
      }
      playRight();
      setScore(score + scoreCoeff);
      setRightIcon("bi bi-check-circle-fill text-center col");
      setAllRightAnswers(allRigthAnswers + 1);
      setRigthAnswers([
        ...rigthAnswers,
        {
          word: selectWords[cardIndex].word,
          translate: selectWords[cardIndex].wordTranslate
        }
      ]);
    } else {
      playWrong();
      setScoreCoeff(1);
      setRightIcon("bi bi-emoji-frown-fill text-center col");
      setWrongAnswers([
        ...wrongAnswers,
        {
          word: selectWords[cardIndex].word,
          translate: selectWords[cardIndex].wordTranslate
        }
      ]);
    }
    commonButtonAction();
  };

  const rightButtonAction = () => {
    if (cardIndex === translationIndex) {
      if (scoreCoeff < 3) {
        setScoreCoeff(scoreCoeff + 1);
      }
      playRight();
      setScore(score + scoreCoeff);
      setRightIcon("bi bi-check-circle-fill text-center col");
      setAllRightAnswers(allRigthAnswers + 1);
      setRigthAnswers([
        ...rigthAnswers,
        {
          word: selectWords[cardIndex].word,
          translate: selectWords[cardIndex].wordTranslate
        }
      ]);
    } else {
      playWrong();
      setScoreCoeff(1);
      setRightIcon("bi bi-emoji-frown-fill text-center col");
      setWrongAnswers([
        ...wrongAnswers,
        {
          word: selectWords[cardIndex].word,
          translate: selectWords[cardIndex].wordTranslate
        }
      ]);
    }
    commonButtonAction();
  };

  useEffect(() => {
    document.addEventListener("keypress", getKeyDown, true);
    return () => {
      document.removeEventListener("keypress", getKeyDown, true);
    };
  }, [cardIndex]);

  const getKeyDown = (e) => {
    if (e.key === "w" || e.key === "W") {
      wrongButtonAction();
    } else if (e.key === "r" || e.key === "R") {
      rightButtonAction();
    }
  };

  return (
    <>
      <div className="card-container">
        {!countdown ? (
          <SprintCountdown />
        ) : !finished ? (
          <div className="main-card col-xs-12 col-sm-6 col-md-4 w-100">
            <SprintTimer />
            <div className="card">
              <div className="sprint-score-coeff d-flex justify-content-center align-items-center">
                <h5>Score Coefficient x {scoreCoeff}</h5>
              </div>
              <div className="sprint-score d-flex justify-content-center align-items-center">
                <h3>Total Score: {score}</h3>
              </div>

                <div className="card-body container">
                  <div className="words-underline row">
                    <div className="card-title-top col-5 text-end my-auto">
                      <span>word</span>
                    </div>

                    <i className="bi bi-arrow-down-circle-fill col-2 text-center my-auto"></i>

                    <div className="card-title-top col-5 text-start my-auto">
                      <span>translation</span>
                    </div>
                  </div>

                  <div className="check-mark row my-auto">
                    <i className={statusIcon}></i>
                  </div>

                  <div className="words-translation row">
                    <div className="card-title col-5 text-end my-auto">
                      <h3>{selectWords[cardIndex].word}</h3>
                    </div>

                    <i className="bi bi-arrow-up-circle-fill text-center col-2"></i>

                    <div className="card-title col-5 text-start my-auto">
                      <h3>{selectWords[translationIndex].wordTranslate}</h3>
                    </div>
                  </div>

                  <hr />
                  <div className="button-group row">
                    <button
                      type="button"
                      className="sprint-wrong-btn"
                      onClick={() => wrongButtonAction()}
                    >
                      Wrong
                    </button>
                    <i className="bi bi-grip-vertical col-2 text-center"></i>
                    <button
                      type="button"
                      className="sprint-right-btn"
                      onClick={() => rightButtonAction()}
                    >
                      Right
                    </button>
                  </div>
                </div>
                <div className="keboard-button-group row">
                  <h5 className="col-2 text-center">or press W</h5>
                  <i className="bi bi-grip-vertical col-2 text-center"></i>
                  <h5 className="col-2 text-center">or press R</h5>
                </div>
              </div>
              </section>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {finished ? (
        <div className="card-container d-flex flex-column justify-content-around align-items-center">
          <div className="card col-xs-12 col-sm-6 col-md-4 w-100">
            <h1>
              Your score: {score} - {getResultPhrase()}
            </h1>
            <h5>
              During the attempt, {allAnswers} words were compared.{" "}
              {allRigthAnswers} words were answered correctly, which is{" "}
              {Math.floor((100 * allRigthAnswers) / allAnswers) || 0} %
            </h5>
            <div className="answers-result d-flex">
              <div className="rigth-answers answers-list">
                <h3>Right answers:</h3>
                {rigthAnswers.map((item) => {
                  return (
                    <div key={item.id}>
                    <button
                      onClick={() => {
                        const playWord = new Audio(
                          `http://localhost:8080/${item.audio}`
                        );
                        playWord.play();
                      }}
                      className="btn btn-success m-2"
                    >
                      ♬
                    </button>
                    <span>
                      {" "}
                      {item.word}
                      {" - "}
                      {item.translate}
                    </span>
                  </div>
                  );
                })}
              </div>

              <div className="wrong-answers answers-list">
                <h3>Wrong answers:</h3>
                {wrongAnswers.map((item) => {
                  return (
                    <div key={item.id}>
                    <button
                      onClick={() => {
                        const playWord = new Audio(
                          `http://localhost:8080/${item.audio}`
                        );
                        playWord.play();
                      }}
                      className="btn btn-danger m-2"
                    >
                      ♬
                    </button>
                    <span>
                      {" "}
                      {item.word}
                      {" - "}
                      {item.translate}
                    </span>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

SprintCardWord.propTypes = {
  selectWords: PropTypes.array,
  onStart: PropTypes.func,
  check: PropTypes.bool
};

export default SprintCardWord;
