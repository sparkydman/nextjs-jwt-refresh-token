import {
  REGISTER_PENDING,
  REGISTER_FULFILLED,
  REGISTER_REJECTED,
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  GET_PENDING,
  GET_FULFILLED,
  GET_REJECTED,
  GET_TOKEN_PENDING,
  GET_TOKEN_FULFILLED,
  GET_TOKEN_REJECTED,
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
} from './types';

export const registerReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_PENDING:
      return { loading: true };
    case REGISTER_FULFILLED:
      return { loading: false, success: true, msg: payload };
    case REGISTER_REJECTED:
      return { loading: false, success: false, msg: payload };
    default:
      return state;
  }
};

export const loginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_PENDING:
      return { loading: true };
    case LOGIN_FULFILLED:
      return { loading: false, token: payload };
    case LOGIN_REJECTED:
      return { loading: false, msg: payload };
    default:
      return state;
  }
};

export const getUserReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PENDING:
      return { loading: true };
    case GET_FULFILLED:
      return { loading: false, user: payload };
    case GET_REJECTED:
      return { loading: false, msg: payload };
    default:
      return state;
  }
};

export const getTokenReducer = (state = { token: null }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TOKEN_PENDING:
      return { loading: true };
    case GET_TOKEN_FULFILLED:
      console.log(payload);
      return { loading: false, token: payload };
    case GET_TOKEN_REJECTED:
      return { loading: false, msg: payload };
    default:
      return state;
  }
};

export const logoutReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGOUT_PENDING:
      return { loading: true };
    case LOGOUT_FULFILLED:
      return { loading: false, success: true };
    case LOGOUT_REJECTED:
      return { loading: false, msg: payload };
    default:
      return state;
  }
};
