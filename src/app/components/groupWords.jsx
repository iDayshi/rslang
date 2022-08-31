import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const GroupWords = ({ onGroupChange }) => {
  const { currentUser } = useAuth();

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
              key={button}
              type="button"
              className={`btn ${button} ms-3`}
              onClick={() => onGroupChange(index)}
            >
              {index + 1}
            </button>
          );
        } else if (currentUser) {
          return (
            <>
              <button
                key={button}
                type="button"
                className={`btn ${button} ms-3`}
                onClick={() => onGroupChange(index)}
              >
                Сложные слова
              </button>
              <Link
                key={"sprintBook"}
                className="btn btn-info ms-3 active"
                to="/audiocall"
              >
                Аудиовызов
              </Link>
              <Link
                key={"audioBook"}
                className="btn btn-info ms-3 active"
                to="/sprint"
              >
                Спринт
              </Link>
            </>
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
