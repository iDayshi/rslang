import React, { useState } from "react";
import { useAudioCall } from "../../../hooks/useAudioCall";
import GroupWords from "../../common/groupWords";
import ModalWindow from "../../common/modalAudioCallGame";
import PropTypes from "prop-types";

const MenuGame = ({ onStart, check }) => {
  const [modalShow, setModalShow] = useState(false);
  const [level, setLevel] = useState(0);
  const { getWordsGame, isLoading } = useAudioCall();

  const handleGroupChange = (groupIndex) => {
    setLevel(groupIndex + 1);
    getWordsGame(groupIndex);
  };

  return (
    <div className="container audiocall_page">
      <div className="top_line">
        <h2 className="audio_call_name">Аудиовызов</h2>
        <button className="audio-info" onClick={() => setModalShow(true)}>
          <i className="bi bi-info-circle"></i>
        </button>
      </div>

      <section className="text-center white_bcg">
        <ModalWindow show={modalShow} onHide={() => setModalShow(false)} />
        <h4 className="audiocall_header">
          {check
            ? "Уровень из словаря"
            : level
            ? `Уровень ${level}`
            : "Выберите уровень"}
        </h4>
        {check ? "" : <GroupWords onGroupChange={handleGroupChange} />}
        <button
          onClick={onStart}
          type="button"
          className="audiocall_button"
          disabled={isLoading && !check}
        >
          Начать игру
        </button>
      </section>
    </div>
  );
};

MenuGame.propTypes = {
  onStart: PropTypes.func,
  check: PropTypes.bool
};

export default MenuGame;
