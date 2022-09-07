import React, { useState } from "react";
import PropTypes from "prop-types";
import SprintCountdown from "./sprintCountdown";
import SprintTimer from "./sprintTimer";

import rightSound from "./sounds/right.mp3";
import wrongSound from "./sounds/wrong.mp3";
import finishSound from "./sounds/finish.mp3";
import { useAuth } from "../../../hooks/useAuth";
import { useWord } from "../../../hooks/useWords";
import ResultSprint from "./sprintResult";

const SprintCardWord = ({ selectWords }) => {
  const { currentUser } = useAuth();
  const { gameResultsCheck } = useWord();
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
  const [attempts, setAttempts] = useState(5);

  const resultPhrases = ["Продолжай!", "Неплохо!!", "Невероятно!!!"]; // set final result phrase
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
      setCountdown(true);
    }, 33500);
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
    const fakeTranslationIndex = Math.floor(
      Math.random() * (selectWords.length - 1)
    );

    setCardIndex(cardIndex + 1);
    defineIsFake();
    setAllAnswers(allAnswers + 1);

    isFakeIndex
      ? setTranslationIndex(fakeTranslationIndex)
      : setTranslationIndex(cardIndex + 1);
  };

  const wrongButtonAction = () => {
    if (currentUser) {
      gameResultsCheck(selectWords[cardIndex], cardIndex !== translationIndex);
    }
    if (cardIndex !== translationIndex) {
      if (scoreCoeff < 3) {
        setScoreCoeff(scoreCoeff + 1);
      }
      playRight();
      setScore(score + scoreCoeff);
      setRightIcon("bi bi-check-circle-fill text-center col");
      setAllRightAnswers(allRigthAnswers + 1);
      setRigthAnswers([...rigthAnswers, selectWords[cardIndex]]);
    } else {
      playWrong();
      setScoreCoeff(1);
      setRightIcon("bi bi-emoji-frown-fill text-center col");
      setWrongAnswers([...wrongAnswers, selectWords[cardIndex]]);
      setAttempts(attempts - 1);
      if (attempts === 0) {
        setFinished(true);
      }
    }
    commonButtonAction();
  };

  const rightButtonAction = () => {
    if (currentUser) {
      gameResultsCheck(selectWords[cardIndex], cardIndex !== translationIndex);
    }
    if (cardIndex === translationIndex) {
      if (scoreCoeff < 3) {
        setScoreCoeff(scoreCoeff + 1);
      }
      playRight();
      setScore(score + scoreCoeff);
      setRightIcon("bi bi-check-circle-fill text-center col");
      setAllRightAnswers(allRigthAnswers + 1);
      setRigthAnswers([...rigthAnswers, selectWords[cardIndex]]);
    } else {
      playWrong();
      setScoreCoeff(1);
      setRightIcon("bi bi-emoji-frown-fill text-center col");
      setWrongAnswers([...wrongAnswers, selectWords[cardIndex]]);
      setAttempts(attempts - 1);
      if (attempts === 0) {
        setFinished(true);
      }
    }
    commonButtonAction();
  };

  // useEffect(() => {
  //   document.addEventListener("keypress", getKeyDown, true);
  //   return () => {
  //     document.removeEventListener("keypress", getKeyDown, true);
  //   };
  // }, [cardIndex]);

  // const getKeyDown = (e) => {
  //   if (e.key === "w" || e.key === "W") {
  //     wrongButtonAction();
  //   } else if (e.key === "r" || e.key === "R") {
  //     rightButtonAction();
  //   }
  // };

  return (
    <>
      <div className="card-container d-flex flex-column justify-content-around align-items-center">
        {!countdown ? (
          <SprintCountdown />
        ) : !finished ? (
          <div className="main-card col-xs-12 col-sm-6 col-md-4 w-100">
            <SprintTimer />
            <div className="card">
              <div className="sprint-score-coeff d-flex justify-content-center align-items-center">
                <h5>Коэффициент x {scoreCoeff}</h5>
              </div>
              <div className="sprint-score d-flex justify-content-center align-items-center">
                <h3>Осталось попыток: {attempts}</h3>
              </div>
              <div className="sprint-score d-flex justify-content-center align-items-center">
                <h3>Счет: {score}</h3>
              </div>

              <div className="card-body container">
                <div className="words-underline row">
                  <div className="card-title-top col-5 text-end my-auto">
                    <h5>слово</h5>
                  </div>

                  <i className="bi bi-arrow-down-circle-fill col-2 text-center my-auto"></i>

                  <div className="card-title-top col-5 text-start my-auto">
                    <h5>перевод</h5>
                  </div>
                </div>

                <div className="check-mark row my-auto">
                  <i className={"status-icon " + statusIcon}></i>
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
                    onClick={() => {
                      wrongButtonAction();
                    }}
                  >
                    Неверно
                  </button>
                  <i className="bi bi-grip-vertical col-2 text-center"></i>
                  <button
                    type="button"
                    className="btn btn-success btn-md col-5"
                    onClick={() => {
                      rightButtonAction();
                    }}
                  >
                    Верно
                  </button>
                </div>
                <div className="keboard-button-group row">
                  <i className="bi bi-grip-vertical col-2 text-center"></i>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {finished ? (
        <ResultSprint
          correctAnswers={rigthAnswers}
          wrongAnswers={wrongAnswers}
          getResultPhrase={getResultPhrase}
          score={score}
          allAnswers={allAnswers}
        />
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
