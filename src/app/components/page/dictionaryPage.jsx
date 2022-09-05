import React, { useState, useEffect } from "react";
import { useWord } from "../../hooks/useWords";
import GroupWords from "../common/groupWords";
import PaginationComponent from "../common/pagination";
import Footer from "../ui/footer";
import CardWordList from "../ui/dictionary/wordCardsList";
import { useAudioCall } from "../../hooks/useAudioCall";

const DictionaryPage = () => {
  const {
    words,
    getWords,
    wordsUser,
    getAllWordsUser,
    isLoading,
    isLoadingUserWords
  } = useWord();
  const { setWordsGameDictionary } = useAudioCall();
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setWordsGameDictionary(words);
  }, [words]);

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
    <>
      <div className="d-flex flex-column align-items-center justify-content-center m-3">
        <h1 className="text-center mb-3">Учебник</h1>
        <GroupWords onGroupChange={handleGroupChange} />
        {!isLoading && !isLoadingUserWords ? (
          <div className="row gutters-sm w-100">
            <div className="container ">
              <div className="card-deck row">
                <CardWordList
                  selectWords={
                    currentGroup !== 6
                      ? words
                      : wordsUser.filter((w) => {
                          return w.difficulty === "hard";
                        })
                  }
                />
              </div>
            </div>
            {currentGroup !== 6 ? (
              <>
                <PaginationComponent
                  currentPage={currentPage + 1}
                  setCurrentPage={setCurrentPage}
                  handlePageChange={handlePageChange}
                  alwaysShown={false}
                />
                <Footer />
              </>
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
    </>
  );
};

export default DictionaryPage;
