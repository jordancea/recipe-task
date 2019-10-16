import { combineReducers } from "redux";
import recipesReducer from "./recipesReducer.js";

export default combineReducers({
  recipes: recipesReducer
});
