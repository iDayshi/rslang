import React, { useState } from "react";
import { Disable } from "react-disable";
import { Link } from "react-router-dom";

import { useSprintWord } from "../../hooks/useSprintWords";

import SprintCardWord from "../ui/sprintPage/sprintCardsWord";
import SprintGroupButtons from "../ui/sprintPage/sprintGroupButtons";
import ModalWindow from "../ui/sprintPage/sprintModalWindow";

import startSound from "../ui/sprintPage/sounds/start.mp3";

const SprintPage = () => {
  const { allGroupWords, getAllGroupWords, wordsGameSprintDictionary } =
    useSprintWord();
  const [isPlayGame, setPlayGame] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const playStart = () => {
    new Audio(startSound).play();
  };

  const handleGroupChange = (groupIndex) => {
    setPlayGame(true);
    getAllGroupWords(groupIndex);
    playStart();
  };

  return (
    <div className="container sprint-page">
      <ModalWindow show={modalShow} onHide={() => setModalShow(false)} />
      <div className="sprint-header">
        <h2 className="sprint-header-title">Sprint-Game</h2>
        <button className="audio-info" onClick={() => setModalShow(true)}>
          <i className="bi bi-info-circle"></i>
        </button>
      </div>
      <div className="main-container d-flex flex-column align-items-center justify-content-center">
        <div className={`row gutters-sm ${isPlayGame ? "w-100" : ""}`}>
          <div className="container ">
            {isPlayGame ? (
              <div className="card-deck row justify-content-center">
                <SprintCardWord
                  selectWords={
                    wordsGameSprintDictionary.length
                      ? wordsGameSprintDictionary.flat()
                      : allGroupWords.flat()
                  }
                />
              </div>
            ) : (
              <Disable disabled={isPlayGame}>
                <SprintGroupButtons
                  check={!!wordsGameSprintDictionary.length}
                  onGroupChange={handleGroupChange}
                />
              </Disable>
            )}
          </div>
        </div>
        {isPlayGame ? (
          <div className="footer-buttons d-flex m-3">
            <button
              type="button"
              className="btn btn-outline-danger btn-lg"
              onClick={() => setPlayGame(false)}
            >
              Заново
            </button>
            <Link className="nav-link" aria-current="page" to="/">
              <button className="btn btn-outline-info btn-lg ms-3">
                Вернуться в меню
              </button>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SprintPage;
