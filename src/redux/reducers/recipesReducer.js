import {
  GET_RECIPES,
  DELETE_RECIPE,
  GET_RECIPE,
  ADD_RECIPE,
  LOADING
} from "../actions/types";

const initialState = {
  recipes: [],
  recipe: {},
  ingredients: {},
  loading: true
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RECIPES:
      return {
        ...state,
        loading: false,
        recipes: action.payload
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        loading: false
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe._id !== action.payload)
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    default:
      return state;
  }
};

export default recipesReducer;
