import {
  GET_RECIPES,
  DELETE_RECIPE,
  GET_RECIPE,
  ADD_RECIPE,
  LOADING
} from "./types";
import {
  getRecipes,
  getRecipeById,
  addRecipe
} from "./../../services/fakeRecipeService";

export const _getRecipes = () => async dispatch => {
  try {
    const response = await getRecipes();
    dispatch({
      type: GET_RECIPES,
      payload: response
    });
  } catch (err) {
    console.log(err); //to do ERROR handling
  }
};

export const _deleteRecipe = id => dispatch => {
  try {
    dispatch({
      type: DELETE_RECIPE,
      payload: id
    });
  } catch (err) {
    console.log(err); //to do ERROR handling
  }
};

export const _getRecipeById = id => async dispatch => {
  try {
    dispatch({ type: LOADING });
    const recipe = await getRecipeById(id);
    dispatch({
      type: GET_RECIPE,
      payload: recipe
    });
  } catch (err) {
    console.log(err); //to do ERROR handling
  }
};

export const _addRecipe = (recipe, history) => async dispatch => {
  try {
    const response = await addRecipe(recipe);
    dispatch({
      type: ADD_RECIPE,
      payload: response
    });
    history.push("/");
  } catch (err) {
    console.log(err);
  }
};
