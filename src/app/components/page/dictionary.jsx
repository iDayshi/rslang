import React, { useState } from "react";
import { useWord } from "../../hooks/useWords";
import GroupWords from "../groupWords";
import Pagination from "../pagination";
import CardWordList from "../ui/wordCardsList";

const DictionaryPage = () => {
  const {
    words,
    getWords,
    wordsUser,
    getAllWordsUser,
    isLoading,
    isLoadingUserWords
  } = useWord();
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
      {!isLoading && !isLoadingUserWords ? (
        <div className="row gutters-sm w-100">
          <div className="container ">
            <div className="card-deck row">
              <CardWordList
                selectWords={currentGroup !== 6 ? words : wordsUser}
              />
            </div>
          </div>
          {currentGroup !== 6 ? (
            <Pagination
              currentPage={currentPage + 1}
              onPageChange={handlePageChange}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Загрузка...</span>
        </div>
      )}
    </div>
  );
};

export default DictionaryPage;
