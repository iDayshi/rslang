import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { useWord } from "../../hooks/useWords";

const GroupWords = ({ onGroupChange }) => {
  const { currentUser } = useAuth();
  const { isPageExplored } = useWord();
  const location = window.location.href;

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
        if (index !== 6) {
          return (
            <button
              key={nanoid(5)}
              type="button"
              className={`btn ${button} ms-3`}
              onClick={() => onGroupChange(index)}
            >
              {index + 1}
            </button>
          );
        } else if (
          currentUser &&
          location !== "http://localhost:3000/audiocall"
        ) {
          return (
            <div key={nanoid(5)}>
              <button
                key={nanoid(5)}
                type="button"
                className={`btn ${button} ms-3`}
                onClick={() => onGroupChange(index)}
              >
                Сложные слова
              </button>
              <Link
                key={nanoid(5)}
                className={`btn btn-info ms-3 ${
                  isPageExplored ? "disabled" : "active"
                }`}
                to="/audiocall"
              >
                Аудиовызов
              </Link>
              <Link
                key={nanoid(5)}
                className={`btn btn-info ms-3 ${
                  isPageExplored ? "disabled" : "active"
                }`}
                to="/sprint"
              >
                Спринт
              </Link>
            </div>
          );
        }
        return "";
      })}
    </div>
  );
};

GroupWords.propTypes = {
  onGroupChange: PropTypes.func.isRequired
};
export default GroupWords;
