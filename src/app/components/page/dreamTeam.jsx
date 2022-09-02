import React from "react";
import Footer from "../../components/ui/footer";

const AboutTeam = () => {
  return (
    <div className="container">

      <div className="team_wrapper">

        <article className="teammate">
            <img
                 className="team_pic"
                 src="https://avatars.githubusercontent.com/u/87650432?v=4"
                 alt="Maksim"
            />
            <div className="teammate_Name">Максим</div>
            <div className="git_person m-3">
                  <a href="https://github.com/iDayshi" className="github_name">
                    <i className="bi bi-github"></i>
                    {" "}
                    iDayshi{" "}
                  </a>
                </div>
            <p>Teamlead. Учебник и словарь. Аутентификация. Статистика. </p>
            <p><i className="bi bi-info-circle"></i><i className="bi">Нравится розовый цвет</i></p>
            <div className="unicorn1"></div>
        </article>

        <article className="teammate">
            <img
                 className="team_pic"
                 src="https://avatars.githubusercontent.com/u/32357160?v=4"
                 alt="Andrey"
            />
            <div className="teammate_Name">Андрей</div>
            <div className="git_person m-3">
                  <a href="https://github.com/Macbaren" className="github_name">
                    <i className="bi bi-github"></i>
                    {" "}
                    Macbaren{" "}
                  </a>
                </div>
            <p>Игра Спринт. Хорошее настроение.</p>
            <p><i className="bi bi-info-circle"></i><i className="bi">Нравится ездить в командировки</i></p>
            <div className="unicorn2"></div>
        </article>

        <article className="teammate">
            <img
                 className="team_pic"
                 src="https://avatars.githubusercontent.com/u/100227589?v=4"
                 alt="Maria"
            />
            <div className="teammate_Name">Мария</div>
            <div className="git_person m-3">
                  <a href="https://github.com/4Quark" className="github_name">
                    <i className="bi bi-github"></i>
                    {" "}
                    4Quark{" "}
                  </a>
            </div>
            <p>Игра Аудиовызов. Главная страница и инфо. Дизайн и красота. </p>
            <p><i className="bi bi-info-circle"></i><i className="bi">Нравится логотип React</i></p>
            <div className="unicorn3"></div>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default AboutTeam;
