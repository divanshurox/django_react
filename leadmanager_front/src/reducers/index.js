import { combineReducers } from "redux";
import leads from "./leads";
import error from "./error";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  leads,
  error,
  messages,
  auth,
});
