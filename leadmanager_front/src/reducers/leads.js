import { GET_LEADS, DELETE_LEADS, ADD_LEADS } from "../actions/types";

const initialState = {
  leads: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload,
      };
    case DELETE_LEADS:
      return {
        ...state,
        leads: state.leads.filter((ele) => ele.id !== action.payload),
      };
    case ADD_LEADS:
      return {
        ...state,
        leads: state.leads.concat(action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
