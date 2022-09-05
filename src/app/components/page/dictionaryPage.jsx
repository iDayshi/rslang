import React, { useEffect } from "react";
import { useWord } from "../../hooks/useWords";
import GroupWords from "../common/groupWords";
import PaginationComponent from "../common/pagination";
import Footer from "../ui/footer";
import CardWordList from "../ui/dictionary/wordCardsList";
import { useAudioCall } from "../../hooks/useAudioCall";
import ModalWindow from "../common/modalDictionary";

const DictionaryPage = () => {
  const {
    page,
    group,
    words,
    getWords,
    wordsUser,
    getAllWordsUser,
    isLoading,
    isLoadingUserWords,
    setGroup,
    setPage,
    isPageExplored
  } = useWord();
  const { setWordsGameDictionary } = useAudioCall();

  const backgroundColors = [
    "108, 117, 125,",
    "13, 202, 240,",
    "13, 110, 253,",
    "25, 135, 84,",
    "255, 193, 7,",
    "220, 53, 69,",
    "33, 37, 41,",
    "11, 156, 49,"
  ];

  useEffect(() => {
    setWordsGameDictionary(words);
  }, [words]);

  const handlePageChange = (pageIndex) => {
    setPage(pageIndex);
    getWords(group, pageIndex);
  };

  const handleGroupChange = (groupIndex) => {
    setPage(0);
    setGroup(groupIndex);
    groupIndex === 6 ? getAllWordsUser() : getWords(groupIndex, 0);
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center m-3">
        <div className="top_line">
          <h2 className="audio_call_name">Учебник</h2>
          <button className="audio-info" onClick={() => setModalShow(true)}><i className="bi bi-info-circle"></i></button>
        </div>
        <ModalWindow show={modalShow} onHide={() => setModalShow(false)} />
        <GroupWords onGroupChange={handleGroupChange} />
        {!isLoading && !isLoadingUserWords ? (
          <div
            style={{
              boxShadow: `inset 0px 0px ${
                isPageExplored ? "120px" : "30px"
              } rgba(${
                isPageExplored ? backgroundColors[7] : backgroundColors[group]
              }0.5)`
            }}
            className="row gutters-sm w-100 p-5"
          >
            <div className="container ">
              <div className="card-deck row">
                <CardWordList
                  selectWords={
                    group !== 6
                      ? words
                      : wordsUser.filter((w) => {
                          return w.difficulty === "hard";
                        })
                  }
                />
              </div>
            </div>
            {group !== 6 ? (
              <>
                <PaginationComponent
                  isPageExplored={isPageExplored}
                  currentPage={Number(page) + 1}
                  setCurrentPage={setPage}
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
          <div className="d-flex justify-content-center p-5">
            <div
              style={{ width: "5rem", height: "5rem" }}
              className="spinner-grow text-info "
              role="status"
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default DictionaryPage;
