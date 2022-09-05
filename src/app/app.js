import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./layouts/main";
import LoginPage from "./layouts/login";
import { ToastContainer } from "react-toastify";
import AuthProvaider from "./hooks/useAuth";
import WordProvaider from "./hooks/useWords";
import SprintWordProvaider from "./hooks/useSprintWords";
import LogOut from "./layouts/logOut";
import AudioCallPage from "./components/page/audioCallPage";
import SprintPage from "./components/page/sprintPage";
import AboutApp from "./components/page/about";
import AboutTeam from "./components/page/dreamTeam";
import StatisticPage from "./components/page/statisticPage";
import DictionaryPage from "./components/page/dictionaryPage";
import AudioCallProvaider from "./hooks/useAudioCall";
import StatisticsProvaider from "./hooks/useStatistic";

function App() {
  return (
    <>
      <AuthProvaider>
        <WordProvaider>
          <StatisticsProvaider>
            <AudioCallProvaider>
              <SprintWordProvaider>
                <NavBar />
                <Switch>
                  <Route path="/logout" component={LogOut} />
                  <Route path="/login/:type?" component={LoginPage} />
                  <Route path="/audiocall" component={AudioCallPage} />
                  <Route path="/sprint" component={SprintPage} />
                  <Route path="/statistic" component={StatisticPage} />
                  <Route path="/dictionary" component={DictionaryPage} />
                  <Route path="/about" component={AboutApp} />
                  <Route path="/dreamTeam" component={AboutTeam} />
                  <Route path="/" exact component={MainPage} />
                  <Redirect to="/" />
                </Switch>
              </SprintWordProvaider>
            </AudioCallProvaider>
          </StatisticsProvaider>
        </WordProvaider>
      </AuthProvaider>

      <ToastContainer />
    </>
  );
}

export default App;
