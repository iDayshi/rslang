import React from "react";
import Footer from "../components/ui/footer";

const MainPage = () => {
  return (
    <>
      <div className="container">
        <main>
          <div className="main_wrapper">
            <div className="main_info">
              <h1 className="logo">RSLang</h1>
              <div className="promo">
                <b>RS Lang</b> – приложение для изучения иностранных слов,
                включающее электронный учебник с базой слов для изучения,
                мини-игры для их повторения, страницу статистики для
                отслеживания индивидуального прогресса
              </div>
            </div>
            <div className="navigation">
              <button className="main_button">Учебник</button>
              <button className="main_button">
                Мини-игра <b>Спринт</b>
              </button>
              <button className="main_button">
                Мини-игра <b>Аудиовызов</b>
              </button>
              <button className="main_button">Статистика</button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
