import React, { useState } from "react";
import { useWord } from "../../hooks/useWords";
import GroupWords from "../groupWords";
import Pagination from "../pagination";
import CardWord from "../ui/cardsWord";

const DictionaryPage = () => {
  const { words, getWords } = useWord();
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    getWords(currentGroup, Number(pageIndex) - 1);
  };

  const handleGroupChange = (groupIndex) => {
    setCurrentPage(1);
    setCurrentGroup(groupIndex);
    getWords(groupIndex, 0);
  };

  console.log("dictionary", words);
  return (
    <div className="d-flex flex-column align-items-center justify-content-center m-5">
      <h1 className="text-center">Учебник</h1>
      <GroupWords onGroupChange={handleGroupChange} />
      <div className="row gutters-sm w-100">
        <div className="container ">
          <div className="card-deck row">
            <CardWord selectWords={words} />
          </div>
        </div>
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default DictionaryPage;
