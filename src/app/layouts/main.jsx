import React, { useState } from "react";
import wordServisece from "../services/word.service";

const MainPage = () => {
  const [words, setWords] = useState([]);
  const handleClick = async () => {
    const { content } = await wordServisece.get();
    setWords(content);
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-5">Добро пожаловать!</h1>
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-info mb-5"
        >
          Получить слова
        </button>
        {words.length ? (
          words.map((word) => {
            return (
              <div key={word.id} className="card mb-3">
                <div className="card-body pt-5">
                  <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                      src="https://www.imgonline.com.ua/examples/bee-on-daisy.jpg"
                      className="img-thumbnail"
                      width="200"
                    />
                    <div className="mt-3">
                      <h4>{word.wordTranslate}</h4>
                      <p className="text-secondary mb-1">{word.textExample}</p>
                      <div className="text-muted">
                        <span className="ms-2">
                          {word.textExampleTranslate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Слова не загружены</h2>
        )}
      </div>
    </>
  );
};

export default MainPage;
