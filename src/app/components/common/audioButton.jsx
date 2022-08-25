import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AudioButton = ({ urls }) => {
  const [audios] = useState(
    urls.map((url) => new Audio(`http://localhost:8080/${url}`))
  );
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      audios[0].play();
      audios[0].addEventListener("ended", () => audios[1].play());
      audios[1].addEventListener("ended", () => audios[2].play());
      audios[2].addEventListener("ended", () => setPlaying(false));
    } else {
      audios.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  }, [playing]);

  return (
    <>
      <button
        type="button"
        className="btn btn-success ms-2"
        onClick={toggle}
      >
        {playing ? "Pause" : "Play"}
      </button>
    </>
  );
};

AudioButton.propTypes = {
  urls: PropTypes.array
};

export default AudioButton;
