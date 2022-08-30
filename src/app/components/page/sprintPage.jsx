import React, { useState } from "react";
import { useSprintWord } from "../../hooks/useSprintWords";
import SprintCardWord from "../ui/sprintPage/sprintCardsWord";
import SprintGroupButtons from "../ui/sprintPage/sprintGroupButtons";

const SprintPage = () => {
  const { allGroupWords, getAllGroupWords } = useSprintWord();
  // const [currentGroup, setCurrentGroup] = useState();
  // const [currentPage, setCurrentPage] = useState(0);
  const [levelChoosed, setLevelChoosed] = useState(false);
  // const [allGroupPages, setAllGroupPages] = useState([]);

  // const handlePageChange = (pageIndex) => {
  //   // setCurrentPage(pageIndex);
  //   getWords(currentGroup, Number(pageIndex));
  // };

  const handleGroupChange = (groupIndex) => {
    // setCurrentPage(0);
    // setCurrentGroup(groupIndex);
    setLevelChoosed(true);
    getAllGroupWords(groupIndex);
  };

  console.log("finalArr", allGroupWords);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center m-5">
      <h1 className="text-center">Sprint-Game</h1>
      <SprintGroupButtons onGroupChange={handleGroupChange} />
      <div className="row gutters-sm w-100">
        <div className="container ">
          {levelChoosed ? (
            <div className="card-deck row justify-content-center">
              <SprintCardWord selectWords={allGroupWords.flat()} />
            </div>
          ) : (
            <h2 className="text-center level-title">
              Please choose your level from above
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default SprintPage;
