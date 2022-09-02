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
          <a className="navbar-brand text-info" href="/">
            Красивый логотип
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar1"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link text-sm-center nav-link active m-1"
                  aria-current="page"
                  to="/"
                >
                  Главная страница
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-sm-center nav-link active m-1"
                  to="/dictionary"
                >
                  Учебник
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-sm-center nav-link active m-1"
                  to="/audiocall"
                  onClick={handleClearWordsGame}
                >
                  Аудиовызов
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-sm-center nav-link active m-1"
                  to="/sprint"
                >
                  Спринт
                </Link>
              </li>
              {currentUser && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-sm-center nav-link active m-1"
                      to="/statistic"
                    >
                      Статистика
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
              <Link className="nav-item active" to="/login">
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
