import { GET_LEADS } from "./types";
import axios from "axios";

export const getLeads = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/leads/");
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
