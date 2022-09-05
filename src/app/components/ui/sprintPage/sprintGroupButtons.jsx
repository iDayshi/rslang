import React from "react";
import PropTypes from "prop-types";

const SprintGroupButtons = ({ onGroupChange }) => {
  const colorButtons = [
    "btn-secondary",
    "btn-info",
    "btn-primary",
    "btn-success",
    "btn-warning",
    "btn-danger"
  ];

  return (
    <div className="d-flex align-items-center justify-content-center mb-4">
      {colorButtons.map((button, index) => {
        return (
          <button
            key={button}
            type="button"
            className={`btn ${button} ms-3`}
            onClick={() => onGroupChange(index)}
          >
            Lev.{index + 1}
          </button>
        );
      })}
    </div>
  );
};

SprintGroupButtons.propTypes = {
  onGroupChange: PropTypes.func.isRequired
};
export default SprintGroupButtons;
