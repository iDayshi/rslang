import React from "react";
import { useWord } from "../../hooks/useWords";

const DictionaryPage = () => {
  const { words } = useWord();
  console.log(words);
  return (
    <div className="container">
      <h1 className="text-center">Учебник</h1>
      <div className="row gutters-sm">
        <div className="container">
          <div className="card-deck row">
            {words.map((word) => {
              return (
                <div key={word.id} className="col-xs-12 col-sm-6 col-md-4">
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
                      <h4 className="card-title">
                        {word.word} | {word.wordTranslate}
                      </h4>
                      <p
                        className="card-text"
                        dangerouslySetInnerHTML={{ __html: word.textExample }}
                      ></p>
                      <button
                        type="button"
                        className="btn btn-light-blue btn-md"
                      >
                        Read more
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;
