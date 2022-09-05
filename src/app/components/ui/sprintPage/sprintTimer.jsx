import React from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

const SprintTimer = () => {
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <h1 className="timer">STOP!</h1>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        duration={30}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[30, 20, 10, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default SprintTimer;
