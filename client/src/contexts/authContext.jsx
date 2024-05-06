import { createContext, useContext, useReducer, useEffect } from "react";
import * as userService from "../services/userService";
const authContext = createContext();
function authReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isInitialize: true,
        user: action.payload.user,
        isAuth: action.payload.isAuth,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOG_IN":
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
      };
    case "LOG_OUT":
      return {
        ...state,
        isAuth: false,
        user: null,
      };
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuth: false,
    isInitialize: false,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({ type: "INIT", payload: { user: null, isAuth: false } });
      return;
    }
    async function fetchUser() {
      const data = await userService.getMe();
      if (data.status === "success") {
        dispatch({
          type: "INIT",
          payload: { isAuth: true, user: data.data.user },
        });
      } else {
        console.log(data.message);
        dispatch({ type: "INIT", payload: { user: null, isAuth: false } });
      }
    }
    fetchUser();
  }, []);

  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
}
export function useAuth() {
  return useContext(authContext);
}
