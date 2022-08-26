import React, { useState } from "react";
import { useWord } from "../../hooks/useWords";
import GroupWords from "../groupWords";
import Pagination from "../pagination";
import CardWord from "../ui/cardsWord";

const DictionaryPage = () => {
  const { words, getWords, wordsUser, getAllWordsUser } = useWord();
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    getWords(currentGroup, pageIndex);
  };

  const handleGroupChange = (groupIndex) => {
    setCurrentPage(0);
    setCurrentGroup(groupIndex);
    groupIndex === 6 ? getAllWordsUser() : getWords(groupIndex, 0);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center m-5">
      <h1 className="text-center">Учебник</h1>
      <GroupWords onGroupChange={handleGroupChange} />
      <div className="row gutters-sm w-100">
        <div className="container ">
          <div className="card-deck row">
            <CardWord selectWords={currentGroup !== 6 ? words : wordsUser} />
          </div>
        </div>
        <Pagination
          currentPage={currentPage + 1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DictionaryPage;
