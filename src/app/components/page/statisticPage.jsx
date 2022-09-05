import React from "react";
import Footer from "../ui/footer";
import Statistic from "../ui/statistic";

const StatisticPage = () => {
  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          <h1>Страница Статистики</h1>
          <div className="container-fluid">
            <Statistic name={"Аудиовызов"} />
            <Statistic name={"Спринт"} />
            <Statistic name={"Пользователя"} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StatisticPage;
