import React, { useState } from "react";
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
  const [scoreCoeff, setScoreCoeff] = useState(1);
  const [statusIcon, setRightIcon] = useState(
    "bi bi-question-circle-fill text-center col"
  );
  const [finished, setFinished] = useState(false);

  const resultPhrases = ["Keep going!", "Not Bad!!", "Awesome!!!"]; // set final result phrase
  const getResultPhrase = () => {
    playFinish();
    if (score < 10) {
      return resultPhrases[0];
    } else if (score < 50) {
      return resultPhrases[1];
    } else return resultPhrases[3];
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

    isFakeIndex
      ? setTranslationIndex(fakeTranslationIndex)
      : setTranslationIndex(cardIndex + 1);

    console.log("indexes", cardIndex, translationIndex, fakeTranslationIndex);
  };

  const wrongButtonAction = () => {
    if (cardIndex !== translationIndex) {
      if (scoreCoeff < 3) {
        setScoreCoeff(scoreCoeff + 1);
      }
      playRight();
      setScore(score + scoreCoeff);
      setRightIcon("bi bi-check-circle-fill text-center col");
    } else {
      playWrong();
      setScoreCoeff(1);
      setRightIcon("bi bi-emoji-frown-fill text-center col");
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
    } else {
      playWrong();
      setScoreCoeff(1);
      setRightIcon("bi bi-emoji-frown-fill text-center col");
    }
    commonButtonAction();
  };

  return (
    <>
      <div className="card-container d-flex flex-column justify-content-around align-items-center">
        {!countdown ? (
          <SprintCountdown />
        ) : !finished ? (
          <div className="main-card col-xs-12 col-sm-6 col-md-4 w-50">
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
                    <h5>word</h5>
                  </div>

                  <i className="bi bi-arrow-down-circle-fill col-2 text-center my-auto"></i>

                  <div className="card-title-top col-5 text-start my-auto">
                    <h5>translation</h5>
                  </div>
                </div>

                <div className="check-mark row">
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
                    className="btn btn-danger btn-md col-5"
                    onClick={() => wrongButtonAction()}
                  >
                    Wrong
                  </button>
                  <i className="bi bi-grip-vertical col-2 text-center"></i>
                  <button
                    type="button"
                    className="btn btn-success btn-md col-5"
                    onClick={() => rightButtonAction()}
                  >
                    Right
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {finished ? (
        <div className="card-container d-flex flex-column justify-content-around align-items-center">
          <div className="main-card col-xs-12 col-sm-6 col-md-4 w-50">
            <h1>
              Your score: {score} - {getResultPhrase()}
            </h1>
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
