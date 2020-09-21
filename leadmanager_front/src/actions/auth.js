import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGOUT_USER,
  GET_ERRORS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";
import axios from "axios";
import { returnErrors } from "./messages";

export const registerUser = ({ username, password, email }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/auth/register",
        JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data,
          status: err.response.status,
        },
      });
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
};

export const loadUser = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: USER_LOADING,
    });
    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    try {
      const res = await axios.get("/api/auth/user", config);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      returnErrors(err.response.data, err.response.status);
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/auth/login",
        JSON.stringify({
          username,
          password,
        }),
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data,
          status: err.response.status,
        },
      });
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    try {
      const res = await axios.post("/api/auth/logout", null, config);
      dispatch({
        type: LOGOUT_USER,
      });
    } catch (err) {
      returnErrors(err.response.data, err.response.status);
    }
  };
};
