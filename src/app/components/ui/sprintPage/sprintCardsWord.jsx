import React, { useState } from "react";
import PropTypes from "prop-types";
import SprintCountdown from "./sprintCountdown";
import SprintTimer from "./sprintTimer";

const SprintCardWord = ({ selectWords }) => {
  const [countdown, setCountdown] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  (function () {
    setTimeout(() => {
      setCountdown(true);
    }, 3500);
  })();

  return (
    <>
      <div className="card-container d-flex flex-column justify-content-around align-items-center">
        {!countdown ? (
          <SprintCountdown />
        ) : (
          <div className="col-xs-12 col-sm-6 col-md-4 w-50">
            <SprintTimer />
            <div className="card">
              <div className="sprint-score d-flex justify-content-center align-items-center">
                <h5>Score: 0</h5>
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
                  <i className="bi bi-check-circle-fill text-center col"></i>
                  {/* <i className="bi bi-emoji-frown-fill col"></i> */}
                </div>

                <div className="words-translation row">
                  <div className="card-title col-5 text-end my-auto">
                    <h3>{selectWords[cardIndex].word}</h3>
                  </div>

                  <i className="bi bi-arrow-up-circle-fill text-center col-2"></i>

                  <div className="card-title col-5 text-start my-auto">
                    <h3>{selectWords[cardIndex].wordTranslate}</h3>
                  </div>
                </div>

                <hr />
                <div className="button-group row">
                  <button
                    type="button"
                    className="btn btn-danger btn-md col-5"
                    onClick={() => setCardIndex(cardIndex + 1)}
                  >
                    Wrong
                  </button>
                  <i className="bi bi-grip-vertical col-2 text-center"></i>
                  <button
                    type="button"
                    className="btn btn-success btn-md col-5"
                    onClick={() => setCardIndex(cardIndex + 1)}
                  >
                    Right
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

SprintCardWord.propTypes = {
  selectWords: PropTypes.array
};

export default SprintCardWord;
