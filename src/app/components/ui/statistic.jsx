import React from "react";
import PropTypes from "prop-types";
import { useStatistic } from "../../hooks/useStatistic";

const Statistic = ({ name }) => {
  const { statistics, isLoading } = useStatistic();
  return (
    <>
      {!isLoading ? (
        <section>
          <div className="row ">
            <div className="col-12 mt-3 mb-4">
              <h4 className="text-uppercase ">Cтатистика {name}</h4>
            </div>
          </div>
          <div className="row text-center white_bcg_statistic statistic_page">
            <div className="col-xl-3 col-sm-6 col-12 mb-0">
              <div className="card">
                <div
                  className="card-body"
                  style={{
                    padding: "0px"
                  }}
                >
                  <div className="d-flex justify-content-between px-md-1">
                    <div className="align-self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="gold"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>
                    </div>
                    <div className="text-end">
                      <h3 className="text-info">
                        {name === "Пользователя"
                          ? statistics.learnedWords
                          : name === "Аудиовызов"
                          ? statistics.gamesAudioCall.learnedNewWords
                          : statistics.gamesSprint.learnedNewWords}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.8rem"
                        }}
                        className="mb-0"
                      >
                        <strong>Новых слов</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-0">
              <div className="card">
                <div
                  className="card-body"
                  style={{
                    padding: "0px"
                  }}
                >
                  <div className="d-flex justify-content-between px-md-1">
                    <div className="align-self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="gold"
                        className="bi bi-percent"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                      </svg>
                    </div>
                    <div className="text-end">
                      <h3 className="text-info">
                        {name === "Пользователя"
                          ? (statistics.gamesAudioCall.percentage +
                              statistics.gamesSprint.percentage) /
                            2
                          : name === "Аудиовызов"
                          ? statistics.gamesAudioCall.percentage
                          : statistics.gamesSprint.percentage}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.8rem"
                        }}
                        className="mb-0 "
                      >
                        <strong>Процент правильных ответов</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-0">
              <div className="card">
                <div
                  className="card-body"
                  style={{
                    padding: "0px"
                  }}
                >
                  <div className="d-flex justify-content-between px-md-1">
                    <div className="align-self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="gold"
                        className="bi bi-award"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                      </svg>
                    </div>
                    <div className="text-end">
                      <h3 className="text-info">
                        {name === "Пользователя"
                          ? statistics.gamesAudioCall.series >
                            statistics.gamesSprint.series
                            ? statistics.gamesAudioCall.series
                            : statistics.gamesSprint.series
                          : name === "Аудиовызов"
                          ? statistics.gamesAudioCall.series
                          : statistics.gamesSprint.series}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.8rem"
                        }}
                        className="mb-0"
                      >
                        <strong>Серия правильных ответов</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-0">
              <div className="card">
                <div
                  className="card-body"
                  style={{
                    padding: "0px"
                  }}
                >
                  <div className="d-flex justify-content-between px-md-1">
                    <div className="align-self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="gold"
                        className="bi bi-joystick"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z" />
                        <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z" />
                      </svg>
                    </div>
                    <div className="text-end">
                      <h3 className="text-info">
                        {name === "Пользователя"
                          ? statistics.gamesAudioCall.gamesPlayed +
                            statistics.gamesSprint.gamesPlayed
                          : name === "Аудиовызов"
                          ? statistics.gamesAudioCall.gamesPlayed
                          : statistics.gamesSprint.gamesPlayed}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.8rem"
                        }}
                        className="mb-0"
                      >
                        <strong>Игр сыграно</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        "loading"
      )}
    </>
  );
};

Statistic.propTypes = {
  name: PropTypes.string
};

export default Statistic;
