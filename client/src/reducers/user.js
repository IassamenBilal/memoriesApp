import {
  USER_LOADING,
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FAILED_LOADING_USER,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  isAuth: false,
  user: {},
  isRegister: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case "USER_LOGGED":
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        isLoading: false,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isRegister: true,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: action.payload.user,
      };

    case (REGISTER_FAIL, LOGIN_FAIL, FAILED_LOADING_USER):
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isRegister: false,
        user: {},
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        user: {},
      };

    default:
      return {
        ...state,
      };
  }
}
