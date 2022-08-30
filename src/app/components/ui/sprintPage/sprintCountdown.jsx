import React from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

const SprintCountdown = () => {
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <h1 className="timer font-weight-bold">GO!</h1>;
    }

    return (
      <div className="timer">
        <div className="value countdown">{remainingTime}</div>
      </div>
    );
  };

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        duration={3}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[3, 2, 1]}
        onComplete={() => ({ shouldRepeat: true, delay: 1 })}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default SprintCountdown;
