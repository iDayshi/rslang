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
    <div className="container sprint_page">
      <div className="top_line">
        <h2 className="audio_call_name">Sprint-Game</h2>
        <button className="audio-info" onClick={() => setModalShow(true)}><i className="bi bi-info-circle"></i></button>
      </div>
      <section className="text-center white_bcg">
      <Disable disabled={levelChoosed}>
        <SprintGroupButtons onGroupChange={handleGroupChange} />
      </Disable>
      <div className="row gutters-sm w-100">
        <ModalWindow show={modalShow} onHide={() => setModalShow(false)} />
        <div className="container ">
          {levelChoosed ? (
            <div className="card-deck row justify-content-center">
              <SprintCardWord selectWords={allGroupWords.flat()} />
            </div>
          ) : (
            <h4 className="sprint_header">
              Please choose your level from above
            </h4>
          )}
        </div>
      </div>
      {levelChoosed ? (
        <div className="sprint-buttons">
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
      </section>
    </div>
  );
};

export default SprintPage;
