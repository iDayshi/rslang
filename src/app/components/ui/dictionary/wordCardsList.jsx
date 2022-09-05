import React from "react";
import PropTypes from "prop-types";
import CardWord from "./cardWord";

const CardWordList = ({ selectWords }) => {
  if (!selectWords.length) {
    return (
      <>
        <h1 className="container text-center">
          У вас пока нет добавленых слов
        </h1>
      </>
    );
  }
  return (
    <>
      {selectWords.map((word) => (
        <div key={word.id} className="col-xs-12 col-sm-6 col-md-4 w-100 mb-3">
          <CardWord word={word} />
        </div>
      ))}
    </>
  );
};

CardWordList.propTypes = {
  selectWords: PropTypes.array
};

export default CardWordList;
