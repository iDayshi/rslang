import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <div className="container">
        <main>
          <div className="main_wrapper">
            <div className="main_info">
              <h1 className="logo">RSLang</h1>
              <div className="promo">
                <b>RS Lang</b> – приложение для изучения английского языка.
                Приложение включает в себя электронный учебник с базой слов
                для изучения, мини-игры Спринт и Аудиовызов для закрепления
                результатов изучения, а также страницу статистики для
                отслеживания индивидуального прогресса и оценки текущего уровня
                знаний.
              </div>
            </div>
            <div className="navigation">

              <Link
                className="text-reset text-decoration-none"
                to="/dictionary"
              >
                <button className="main_button">
                  Учебник
                </button>
              </Link>

              <Link
                className="text-reset text-decoration-none"
                to="/audiocall"
              >
                <button className="main_button">
                  Мини-игра <b>Аудиовызов</b>
                </button>
              </Link>

              <Link
                className="text-reset text-decoration-none"
                to="/sprint"
              >
                <button className="main_button">
                  Мини-игра <b>Спринт</b>
                </button>
              </Link>

              <Link
                className="text-reset text-decoration-none"
                to="/statistic"
              >
                <button className="main_button">
                  Статистика
                </button>
              </Link>

              <div className="d-flex justify-content-center">

                <Link
                  className="text-reset text-decoration-none"
                  to="/about"
                >
                  <button className="main_button additional_button">
                    о приложении
                  </button>
                </Link>

                <Link
                  className="text-reset text-decoration-none"
                  to="/dreamTeam"
                >
                  <button className="main_button additional_button">
                    о команде
                  </button>
                </Link>

              </div>

            </div>
          </div>
        </main>
        <footer>
          <div className="container">
            <div className="footer_info_wrapper">
              <a href="https://rs.school/js/" className="RSS_logo">
                RSSchool
              </a>
              <div className="team">
                <div className="git_person">
                  <a href="https://github.com/iDayshi" className="github_name">
                    <i className="bi bi-github"></i>
                    {" "}
                    Maksim{" "}
                  </a>
                </div>
                <div className="git_person">
                  <a href="https://github.com/Macbaren" className="github_name">
                    <i className="bi bi-github"></i>
                    {" "}
                    Andrey{" "}
                  </a>
                </div>
                <div className="git_person">
                  <a href="https://github.com/4Quark" className="github_name">
                    <i className="bi bi-github"></i>
                    {" "}
                    Maria{" "}
                  </a>
                </div>
              </div>
              <a>© RSSchool, 2022</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MainPage;
