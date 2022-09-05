import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAudioCall } from "../../hooks/useAudioCall";
import { useAuth } from "../../hooks/useAuth";
import { useSprintWord } from "../../hooks/useSprintWords";
import NavProfole from "./navProfile";

const NavBar = () => {
  const { currentUser } = useAuth();
  const { setWordsGameDictionary } = useAudioCall();
  const { setWordsGameSprintDictionary } = useSprintWord();
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar1"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
            <div className={"dropdown-menu sandwich" + (isOpen ? " show" : "")}>
              <Link
                className="nav-link sandwich-el"
                aria-current="page"
                to="/"
                onClick={toggleMenu}
              >
                RSLang
              </Link>
              <Link
                className="nav-link sandwich-el"
                to="/dictionary"
                onClick={toggleMenu}
              >
                Учебник
              </Link>
              <Link
                className="nav-link sandwich-el"
                to="/audiocall"
                onClick={() => {
                  setWordsGameDictionary([]);
                }}
              >
                Аудиовызов
              </Link>
              <Link
                className="nav-link sandwich-el"
                to="/sprint"
                onClick={() => {
                  setWordsGameSprintDictionary([]);
                }}
              >
                Спринт
              </Link>
              {currentUser && (
                <>
                  <Link
                    className="nav-link sandwich-el"
                    to="/statistic"
                    onClick={toggleMenu}
                  >
                    Статистика
                  </Link>
                </>
              )}
            </div>
          </button>
          <div className="collapse navbar-collapse ">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link text-sm-center nav-link active m-1"
                  aria-current="page"
                  to="/"
                >
                  <button className="nav_btn">RSLang</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-sm-center nav-link active m-1"
                  to="/dictionary"
                >
                  <button className="nav_btn">
                    <span className="nav_element_text text-reset text-decoration-none">
                      Учебник
                    </span>
                    <i className="bi bi-book"></i>
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-sm-center nav-link active m-1"
                  to="/audiocall"
                  onClick={() => {
                    setWordsGameDictionary([]);
                  }}
                >
                  <button className="nav_btn">
                    <span className="nav_element_text text-reset text-decoration-none">
                      Аудиовызов
                    </span>
                    <i className="bi bi-music-note-beamed"></i>
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-sm-center nav-link active m-1"
                  to="/sprint"
                  onClick={() => {
                    setWordsGameSprintDictionary([]);
                  }}
                >
                  <button className="nav_btn">
                    <span className="nav_element_text text-reset text-decoration-none">
                      Спринт
                    </span>
                    <i className="bi bi-stopwatch"></i>
                  </button>
                </Link>
              </li>
              {currentUser && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-sm-center nav-link active m-1"
                      to="/statistic"
                    >
                      <button className="nav_btn">
                        <span className="nav_element_text text-reset text-decoration-none">
                          Статистика
                        </span>
                        <i className="bi bi-clipboard2-data"></i>
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <ul className="d-flex navbar-nav ml-auto">
            {currentUser ? (
              <NavProfole />
            ) : (
              <Link
                className="nav-item active text-reset text-decoration-none"
                to="/login"
              >
                <i className="bi bi-key"></i>
                Login
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
