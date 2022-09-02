import React, { useState } from "react";
import { Disable } from "react-disable";
import { useSprintWord } from "../../hooks/useSprintWords";
import SprintCardWord from "../ui/sprintPage/sprintCardsWord";
import SprintGroupButtons from "../ui/sprintPage/sprintGroupButtons";

const SprintPage = () => {
  const { allGroupWords, getAllGroupWords } = useSprintWord();
  const [levelChoosed, setLevelChoosed] = useState(false);

  const handleGroupChange = (groupIndex) => {
    setLevelChoosed(true);
    getAllGroupWords(groupIndex);
  };

  console.log("finalArr", allGroupWords);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center m-5">
      <h1 className="text-center">Sprint-Game</h1>
      <Disable disabled={levelChoosed}>
        <SprintGroupButtons onGroupChange={handleGroupChange} />
      </Disable>
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
      {levelChoosed ? (
        <div className="button-reset">
          <button
            type="button"
            className="btn btn-outline-danger btn-lg"
            onClick={() => setLevelChoosed(false)}
          >
            Reset
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SprintPage;
