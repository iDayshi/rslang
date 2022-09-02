import React from "react";

const AboutApp = () => {
  return (
    <div className="container">
      <div className="about_wrapper">

        <section className="about-promo">
          <b>RS Lang</b> – приложение для изучения английского языка с техникой интервального повторения. Для отслеживания индивидуального прогресса собирается статистика, а для закрепления результата - мини-игры.
          <div className="leaves"></div>
        </section>

        <section className="about-info">

          <div className="groups_wrapper">
            <button className="about_info_btn">
              <b>Изучай</b>
              <p>Учебник RSLang помогает быстро запоминать новые слова. </p>
            </button>
            <button className="about_info_btn">
              <b>Запоминай</b>
              <p>Словарь RSLang позволяет отмечать сложные для изучения слова, добавлять слова в список изученных. </p>
            </button>
            <button className="about_info_btn">
              <b>Играй</b>
              <p>Мини-игры Спринт и Аудиовызов помогают еще быстрее запоминать новые слова в игровой форме.</p>
            </button>
            <button className="about_info_btn">
              <b>Анализируй</b>
              <p>Статистика RSLang отслеживать прогресс изучения английского языка.</p>
            </button>
          </div>

          <div className="info-wrapper">
            <article className="article-wrapper">
              <p>В учебнике 6 разделов для изучения новых слов в соответствии с уровнем сложности. Седьмой раздел учебника включает сложные слова, список этих слов составляется пользователем. Карточка каждого слова показывает написание слова на английском языке, транскрипцию и перевод, а для более глубокого понимания каждого слова приводится пример на английском языке с переводом, а также расширенное определение слова. </p>
            </article>
            <article className="article-wrapper">
              <p>Мини-игра <b>Аудиовызов</b></p>
              <p>Развивает навык аудирования. Необходимо отгадать максимальное количество озвученных диктором слов. Для ответа используйте мышь, либо цифры 1 - 5 на клавиатуре. Пропустить слово - пробел, перейти к следующему вопросу - «Enter». Большая круглая кнопка повторит слово, а маленькая - озвучит пример. </p>
            </article>
            <article className="article-wrapper">
              <p>Мини-игра <b>Спринт</b></p>
              <p>Развивает скорость перевода. За отведенное время нужно дать как можно больше правильных ответов. Необходимо отгадать, правильно ли предложен перевод слова. </p>
              </article>
          </div>

        </section>

      </div>

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
  );
};

export default AboutApp;
