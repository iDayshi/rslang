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
import LogOut from "./layouts/logOut";
import AudioCallPage from "./components/page/audioCallPage";
import SprintPage from "./components/page/sprintPage";
import StatisticPage from "./components/page/statisticPage";
import DictionaryPage from "./components/page/dictionaryPage";
import AudioCallProvaider from "./hooks/useAudioCall";

function App() {
  return (
    <>
      <AuthProvaider>
        <AudioCallProvaider>
          <NavBar />
          <WordProvaider>
            <Switch>
              <Route path="/logout" component={LogOut} />
              <Route path="/login/:type?" component={LoginPage} />
              <Route path="/audiocall" component={AudioCallPage} />
              <Route path="/sprint" component={SprintPage} />
              <Route path="/statistic" component={StatisticPage} />
              <Route path="/dictionary" component={DictionaryPage} />
              <Route path="/" exact component={MainPage} />
              <Redirect to="/" />
            </Switch>
          </WordProvaider>
        </AudioCallProvaider>
      </AuthProvaider>
      <ToastContainer />
    </>
  );
}

export default App;
