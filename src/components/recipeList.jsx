import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { _deleteRecipe } from "../redux/actions/recipesActions";
import Spinner from "./spinner";
import { Link } from "react-router-dom";

const RecipeList = ({ recipes, _getRecipes, _deleteRecipe }) => {
  const handleDelete = id => {
    _deleteRecipe(id);
  };

  if (recipes.loading) return <Spinner />;

  if (recipes.recipes.length === 0) return <h2>No recipes found!</h2>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="hide-sm">Recipe id</th>
          <th>Name</th>
          <th className="hide-sm">Source</th>
          <th className="hide-sm">Number of Ingredients</th>
          <th className="hide-sm">List of Ingredients</th>
          <th className="hide-sm">Instructions</th>
          <th className="hide-sm">Time</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {recipes.recipes.map(recipe => (
          <tr key={recipe._id}>
            <td className="hide-sm">{recipe._id}</td>
            <td>{recipe.name}</td>
            <td className="hide-sm">{recipe.source}</td>
            <td className="hide-sm">{recipe.ingredients.length}</td>
            <td className="hide-sm">
              {recipe.ingredients.slice(0, 3).map(ing => {
                return (
                  <span className="ingredient" key={ing._id}>
                    {ing.name} - {ing.quantity} {ing.metricUnit}
                    {ing.metric}
                  </span>
                );
              })}
              {recipe.ingredients.length > 3 ? "..." : null}
            </td>
            <td className="hide-sm">
              {recipe.instructions.length >= 50
                ? recipe.instructions.substring(0, 50) + "..."
                : recipe.instructions}
            </td>
            <td className="hide-sm">
              {recipe.time > 60
                ? Math.floor(recipe.time / 60) +
                  " hours, " +
                  (recipe.time % 60) +
                  " minutes"
                : recipe.time + " minutes"}
            </td>
            <td>
              <Link
                to={"/recipeDetails/" + recipe._id}
                className="btn btn-primary large-btn"
              >
                View Details
              </Link>
            </td>
            <td>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="btn btn-danger large-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};

RecipeList.propTypes = {
  recipes: PropTypes.object.isRequired,
  _deleteRecipe: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { _deleteRecipe }
)(RecipeList);
