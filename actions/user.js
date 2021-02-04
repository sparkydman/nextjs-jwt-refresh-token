import http from './request';
import axios from 'axios';

import { GET_TOKEN, GET, LOGIN, LOGOUT, REGISTER } from '../reducer/types';

export const register = ({ username, email, password }) => (dispatch) =>
  dispatch({
    type: REGISTER,
    payload: new Promise((resolve, reject) => {
      http
        .post('/api/user', { username, email, password })
        .then((res) => resolve(res.data.msg))
        .catch((err) => reject(err));
    }).catch((err) =>
      Promise.reject(
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message
      )
    ),
  });

export const login = (value) => (dispatch) =>
  dispatch({
    type: LOGIN,
    payload: new Promise((resolve, reject) => {
      http
        .post('/api/user/login', value)
        .then((res) => {
          http.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
          resolve(res.data.accessToken);
        })
        .catch((err) => reject(err));
    }).catch((err) =>
      Promise.reject(
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message
      )
    ),
  });

export const getUser = () => (dispatch, getState) => {
  const { token } = getState();
  console.log(token);
  return dispatch({
    type: GET,
    payload: new Promise((resolve, reject) => {
      http
        .get('/api/user/me', {
          headers: { Authorization: `Bearer ${token.token}` },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    }).catch((err) =>
      Promise.reject(
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message
      )
    ),
  });
};

export const getToken = () => (dispatch) =>
  dispatch({
    type: GET_TOKEN,
    payload: new Promise((resolve, reject) => {
      axios
        .get('/api/user/refresh')
        .then((res) => {
          axios.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
          resolve(res.data.accessToken);
        })
        .catch((err) => reject(err));
    }).catch((err) =>
      Promise.reject(
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message
      )
    ),
  });

export const logout = () => (dispatch) =>
  dispatch({
    type: LOGOUT,
    payload: new Promise((resolve, reject) => {
      http
        .get('/api/user/logout')
        .then(() => {
          resolve('ok');
        })
        .catch((err) => reject(err));
    }).catch((err) =>
      Promise.reject(
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message
      )
    ),
  });
