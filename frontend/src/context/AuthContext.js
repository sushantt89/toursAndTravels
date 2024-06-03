import { createContext, useEffect, useReducer } from "react";

const initialState = {
  user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  loading: false,
  error: false,
};

export const AuthContext = createContext(initialState);

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING":
      return {
        user: null,
        loading: true,
        error: null,
      };

    case "LOGIN_FULFILLED":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };

    case "LOGIN_REJECTED":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_PENDING":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "REGISTER_FULFILLED":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "REGISTER_REJECTED":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const userInfo = JSON.stringify(state.user);
    if (userInfo !== undefined) {
      localStorage.setItem("user", userInfo);
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
