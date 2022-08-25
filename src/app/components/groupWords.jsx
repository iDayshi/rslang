import React from "react";
import PropTypes from "prop-types";

const GroupWords = ({ onGroupChange }) => {
  const colorButtons = [
    "btn-secondary",
    "btn-info",
    "btn-primary",
    "btn-success",
    "btn-warning",
    "btn-danger",
    "btn-dark"
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
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

GroupWords.propTypes = {
  onGroupChange: PropTypes.func.isRequired
};
export default GroupWords;
