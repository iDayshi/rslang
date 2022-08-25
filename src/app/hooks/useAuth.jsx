import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import userServisece from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
  setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";
import authService from "../services/auth.service";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvaider = ({ children }) => {
  const history = useHistory();
  const [currentUser, setUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  async function signUp({ email, password, name }) {
    try {
      await userServisece.create({
        name,
        email,
        password
      });

      await signIn({ email, password });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует"
          };
          throw errorObject;
        }
      }
    }
  }

  async function signIn({ email, password }) {
    console.log({ email, password });
    try {
      const data = await authService.login({ email, password });
      setTokens(data);
      await getUserData();
    } catch (error) {
      console.log(error);
      errorCatcher(error);
      const { code, message } = error;
      console.log(message);
      if (code === "ERR_BAD_REQUEST") {
        switch (message) {
          case "Request failed with status code 404":
            throw new Error("Введён неверный Email или Password");
          case "Request failed with status code 403":
            throw new Error("Введён неверный Email или Password");

          default:
            throw new Error("Множественные попытки входа. Попробуйте позже");
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);
    history.push("/");
  }

  async function getUserData() {
    try {
      const { content } = await userServisece.getCurrentUser();
      setUser(content);
    } catch {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        currentUser,
        logOut
      }}
    >
      {!isLoading ? children : "Loading...."}
    </AuthContext.Provider>
  );
};

AuthProvaider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvaider;
