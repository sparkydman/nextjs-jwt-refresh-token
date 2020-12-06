import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  GET_USER,
  GET_TOKEN,
  LOGOUT,
  USER_ERR,
} from "./types";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  accessToken: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        accessToken: payload.accessToken,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case GET_TOKEN:
      return {
        ...state,
        accessToken: payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        accessToken: null,
      };
    case USER_ERR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
