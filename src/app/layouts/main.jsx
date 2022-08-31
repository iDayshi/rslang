import React from "react";
import Footer from "../components/ui/footer";

const MainPage = () => {
  return (
    <>
      <div className="container d-flex gradient-custom">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 d-flex flex-column align-items-center">
              <img
                className="rounded-circle"
                src="https://avatars.githubusercontent.com/u/87650432?v=4"
                alt="Generic placeholder image"
                width="140"
                height="140"
              />
              <h2>Maksim</h2>
              <p>Плохой начальник</p>
            </div>
            <div className="col-lg-4 d-flex flex-column align-items-center">
              <img
                className="rounded-circle"
                src="https://avatars.githubusercontent.com/u/32357160?v=4"
                alt="Generic placeholder image"
                width="140"
                height="140"
              />
              <h2>Andrey</h2>
              <p>Умница. Делает игру спринт</p>
            </div>
            <div className="col-lg-4 d-flex flex-column align-items-center">
              <img
                className="rounded-circle"
                src="https://avatars.githubusercontent.com/u/100227589?v=4"
                alt="Generic placeholder image"
                width="140"
                height="140"
              />
              <h2>Maria</h2>
              <p>Умница. Делает игру аудиовызов</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
