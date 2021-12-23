import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

import { setupInterceptors } from "../utils/axios-instance";
import { useLogoutMutation } from "../services/mutations";
import { useSetError } from "./error-context";

const userContext = createContext({});
const { Provider } = userContext;

const SetInterceptors = () => {
  const { isLoading, logout } = useLogout();

  useLayoutEffect(() => {
    setupInterceptors(logout);
  }, [logout]);

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export const UserProvider = ({ children }) => {
  const [info, setInfo] = useState(null);

  const setUserInfo = useCallback((userInfo) => {
    if (userInfo) {
      localStorage.setItem("user", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("user");
    }
    setInfo(userInfo);
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setInfo(userInfo);
    }
  }, []);

  return (
    <Provider value={{ userInfo: info, setUserInfo }}>
      <>
        <SetInterceptors />
        {children}
      </>
    </Provider>
  );
};

export const useUserInfo = () => {
  const { userInfo } = useContext(userContext);
  return userInfo;
};

export const useSetUser = () => {
  const { setUserInfo } = useContext(userContext);
  return setUserInfo;
};

export const useLogout = () => {
  const history = useHistory();
  const setUserInfo = useSetUser();
  const setError = useSetError();

  const { isLoading, mutate: logout } = useLogoutMutation({
    onSuccess: () => {
      localStorage.clear();
      setUserInfo(undefined);
      history.push("/login");
    },
    onError: (error) => {
      setError(error);
    },
  });
  return { logout, isLoading };
};
