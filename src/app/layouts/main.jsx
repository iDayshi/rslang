import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/ui/footer";
import { useAudioCall } from "../hooks/useAudioCall";
import { useAuth } from "../hooks/useAuth";
import { useSprintWord } from "../hooks/useSprintWords";

const MainPage = () => {
  const { setWordsGameDictionary } = useAudioCall();
  const { setWordsGameSprintDictionary } = useSprintWord();
  const { currentUser } = useAuth();

  return (
    <>
      <div>
        <main>
          <div className="main_wrapper p-5">
            <div className="main_info">
              <h1 className="logo">RSLang</h1>
              <div className="promo">
                <b>RS Lang</b> – приложение для изучения английского языка.
                Приложение включает в себя электронный учебник с базой слов для
                изучения, мини-игры Спринт и Аудиовызов для закрепления
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
                <button className="main_button">Учебник</button>
              </Link>

              <Link
                className="text-reset text-decoration-none"
                to="/audiocall"
                onClick={() => {
                  setWordsGameDictionary([]);
                }}
              >
                <button className="main_button">
                  Мини-игра <b>Аудиовызов</b>
                </button>
              </Link>

              <Link
                className="text-reset text-decoration-none"
                to="/sprint"
                onClick={() => {
                  setWordsGameSprintDictionary([]);
                }}
              >
                <button className="main_button">
                  Мини-игра <b>Спринт</b>
                </button>
              </Link>
              {currentUser ? (
                <Link
                  className="text-reset text-decoration-none"
                  to="/statistic"
                >
                  <button className="main_button">Статистика</button>
                </Link>
              ) : (
                <></>
              )}

              <div className="d-flex justify-content-center">
                <Link className="text-reset text-decoration-none" to="/about">
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
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
