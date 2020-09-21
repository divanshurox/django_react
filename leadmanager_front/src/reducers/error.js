import { GET_ERRORS } from "../actions/types";

const initState = {
  msg: "",
  status: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default reducer;
