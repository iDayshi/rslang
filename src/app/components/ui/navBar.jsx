import React from "react";
import { Link } from "react-router-dom";
import { useAudioCall } from "../../hooks/useAudioCall";
import { useAuth } from "../../hooks/useAuth";
import NavProfole from "./navProfile";

const NavBar = () => {
  const { currentUser } = useAuth();
  const { setWordsGameDictionary } = useAudioCall();

  const handleClearWordsGame = () => {
    setWordsGameDictionary([]);
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
          >
            <span className="navbar-toggler-icon"></span>
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
                  onClick={handleClearWordsGame}
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
