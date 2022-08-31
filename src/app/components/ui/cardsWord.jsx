import React from "react";
import PropTypes from "prop-types";
import AudioButton from "../common/audioButton";

const CardWord = ({ selectWords }) => {
  return (
    <>
      {selectWords.map((word) => (
        <div key={word.id} className="col-xs-12 col-sm-6 col-md-4 w-25">
          <div className="card">
            <div className="view overlay">
              <img
                className="card-img-top"
                src={`http://localhost:8080/${word.image}`}
                alt={word.word}
              />
              <a href="#!">
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>

            <div className="card-body">
              <h5 className="card-title">
                {word.word} | {word.transcription} | {word.wordTranslate}
              </h5>
              <hr />
              <h6
                className="card-text"
                dangerouslySetInnerHTML={{ __html: word.textExample }}
              ></h6>
              <h6
                className="card-text"
                dangerouslySetInnerHTML={{ __html: word.textExampleTranslate }}
              ></h6>
              <hr />
              <h6
                className="card-text"
                dangerouslySetInnerHTML={{ __html: word.textMeaning }}
              ></h6>
              <h6
                className="card-text"
                dangerouslySetInnerHTML={{ __html: word.textMeaningTranslate }}
              ></h6>
              <hr />
              <button type="button" className="btn btn-secondary btn-md">
                Добавить в сложные
              </button>
              <AudioButton
                urls={[word.audio, word.audioExample, word.audioMeaning]}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

CardWord.propTypes = {
  selectWords: PropTypes.array
};

export default CardWord;
