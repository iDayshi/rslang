import React, { useState } from "react";
import { Disable } from "react-disable";
import { Link } from "react-router-dom";

import { useSprintWord } from "../../hooks/useSprintWords";

import SprintCardWord from "../ui/sprintPage/sprintCardsWord";
import SprintGroupButtons from "../ui/sprintPage/sprintGroupButtons";
import ModalWindow from "../ui/sprintPage/sprintModalWindow";

import startSound from "../ui/sprintPage/sounds/start.mp3";

const SprintPage = () => {
  const { allGroupWords, getAllGroupWords } = useSprintWord();
  const [levelChoosed, setLevelChoosed] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const playStart = () => {
    new Audio(startSound).play();
  };

  const handleGroupChange = (groupIndex) => {
    setLevelChoosed(true);
    getAllGroupWords(groupIndex);
    playStart();
  };

  return (
    <div className="container sprint-page">
      <ModalWindow show={modalShow} onHide={() => setModalShow(false)} />
      <div className="sprint-header">
        <h2 className=".sprint-header-title">Sprint-Game</h2>
        <button className="audio-info" onClick={() => setModalShow(true)}>
          <i className="bi bi-info-circle"></i>
        </button>
      </div>
      <div className="main-container d-flex flex-column align-items-center justify-content-center m-5">
        <Disable disabled={levelChoosed}>
          <SprintGroupButtons onGroupChange={handleGroupChange} />
        </Disable>
        <div className="row gutters-sm w-100">
          <div className="container ">
            {levelChoosed ? (
              <div className="card-deck row justify-content-center">
                <SprintCardWord selectWords={allGroupWords.flat()} />
              </div>
            ) : (
              <h2 className="text-center level-title">
                Please choose your level
              </h2>
            )}
          </div>
        </div>
        {levelChoosed ? (
          <div className="footer-buttons d-flex m-3">
            <button
              type="button"
              className="btn btn-outline-danger btn-lg"
              onClick={() => setLevelChoosed(false)}
            >
              Reset
            </button>
            <Link className="nav-link" aria-current="page" to="/">
              <button className="btn btn-outline-info btn-lg ms-3">
                Back to Main
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
