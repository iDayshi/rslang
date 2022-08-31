import React from "react";
import Footer from "../components/ui/footer";
import React from "react";

const MainPage = () => {
  return (
    <>
      <div className="container">
        <main>
          <div className="main_wrapper">
            <div className="main_info">
              <h1 className="logo">RSLang</h1>
              <div className="promo"><b>RS Lang</b> – приложение для изучения иностранных слов, включающее электронный учебник с базой слов для изучения, мини-игры для их повторения, страницу статистики для отслеживания индивидуального прогресса</div>
            </div>
            <div className="navigation">
              <button className="main_button">Учебник</button>
              <button className="main_button">Мини-игра <b>Спринт</b></button>
              <button className="main_button">Мини-игра <b>Аудиовызов</b></button>
              <button className="main_button">Статистика</button>
            </div>
          </div>
        </main>
        <footer>
          <div className="container">
            <div className="footer_info_wrapper">
              <a href="https://rs.school/js/" className="RSS_logo">RSSchool</a>
              <div className="team">
                <div className="git_person">
                  <a href="https://github.com/iDayshi" className="github_logo"></a>
                  <a href="https://github.com/iDayshi" className="github_name"> Maksim </a>
                </div>
                <div className="git_person">
                  <a href="https://github.com/Macbaren" className="github_logo"></a>
                  <a href="https://github.com/Macbaren" className="github_name"> Andrey </a>
                </div>
                <div className="git_person">
                  <a href="https://github.com/4Quark" className="github_logo"></a>
                  <a href="https://github.com/4Quark" className="github_name"> Maria </a>
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
