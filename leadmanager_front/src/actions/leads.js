import { GET_LEADS, DELETE_LEADS, ADD_LEADS, GET_ERRORS } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messages";

export const getLeads = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      if (token) {
        config.headers["Authorization"] = `Token ${token}`;
      }
      const res = await axios.get("/api/leads/", config);
      dispatch({
        type: GET_LEADS,
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
    }
  };
};

export const deleteLeads = (id) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      if (token) {
        config.headers["Authorization"] = `Token ${token}`;
      }
      const res = await axios.delete(`/api/leads/${id}`, config);
      dispatch(
        createMessage({
          deleteLead: "Lead Deleted!",
        })
      );
      dispatch({
        type: DELETE_LEADS,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data,
          status: err.response.status,
        },
      });
    }
  };
};

export const addLeads = (formData) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      if (token) {
        config.headers["Authorization"] = `Token ${token}`;
      }
      const res = await axios.post(
        "/api/leads/",
        JSON.stringify(formData),
        config
      );
      dispatch(
        createMessage({
          addLead: "Lead Added!",
        })
      );
      dispatch({
        type: ADD_LEADS,
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
    }
  };
};
