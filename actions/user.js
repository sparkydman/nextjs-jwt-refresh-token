import http from "./request";
import cookie from "js-cookie";

import {
  GET_TOKEN,
  GET_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_ERR,
} from "../reducer/types";
import axios from "axios";

export const register = ({ username, email, password }) => async (dispatch) => {
  try {
    await http.post("/api/user", { username, email, password });

    dispatch({
      type: REGISTER_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERR,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    const { data } = await http.post("/api/user/login", { email, password });
    http.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
    // const tenMin = new Date(new Date().getTime() + 10 * 60 * 1000);
    // cookie.set("accessToken", data.accessToken, {
    //   expires: tenMin,
    //   sameSite: "strict",
    //   secure: true,
    // });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: USER_ERR,
    });
  }
};
export const getUser = () => async (dispatch) => {
  try {
    const { data } = await http.get("/api/user/me");
    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERR,
    });
  }
};
export const getToken = () => async (dispatch) => {
  try {
    const { data } = await http.get("/api/user/refresh");
    http.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
    dispatch({
      type: GET_TOKEN,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERR,
    });
  }
};
export const logout = () => async (dispatch) => {
  try {
    const { data } = await http.get("/api/user/logout");
    dispatch({
      type: LOGOUT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERR,
    });
  }
};
