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
      <button type="button" className="btn btn-success ms-2" onClick={toggle}>
        {playing ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pause"
            viewBox="0 0 16 16"
          >
            <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-right"
            viewBox="0 0 16 16"
          >
            <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
          </svg>
        )}
      </button>
    </>
  );
};

AudioButton.propTypes = {
  urls: PropTypes.array
};

export default AudioButton;
