import React, { useState } from "react";
import ModalWindow from "../../common/modalAudioCallGame";
import PropTypes from "prop-types";

const SprintGroupButtons = ({ onGroupChange, check }) => {
  const [modalShow, setModalShow] = useState(false);
  const [level, setLevel] = useState(0);

  const handleGroupChange = (groupIndex) => {
    setLevel(groupIndex + 1);
  };

  const colorButtons = [
    "btn-secondary",
    "btn-info",
    "btn-primary",
    "btn-success",
    "btn-warning",
    "btn-danger"
  ];

  return (
    <section className="text-center white_bcg">
      <ModalWindow show={modalShow} onHide={() => setModalShow(false)} />
      <h4 className="audiocall_header">
        {check
          ? "Уровень из словаря"
          : level
          ? `Уровень ${level}`
          : "Выберите уровень"}
      </h4>
      {check ? (
        ""
      ) : (
        <div className="d-flex align-items-center justify-content-center mb-4">
          {colorButtons.map((button, index) => {
            return (
              <button
                key={button}
                type="button"
                className={`btn ${button} ms-3`}
                onClick={() => handleGroupChange(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      )}
      <button
        onClick={() => onGroupChange(level)}
        type="button"
        className="audiocall_button"
      >
        Начать игру
      </button>
    </section>
  );
};

SprintGroupButtons.propTypes = {
  onGroupChange: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired
};
export default SprintGroupButtons;
