import React, { useEffect } from "react";
import { _getRecipeById, _deleteRecipe } from "../redux/actions/recipesActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./spinner";

const RecipeDetails = ({
  match,
  _getRecipeById,
  _deleteRecipe,
  recipes: { recipe, recipes, loading },
  history
}) => {
  useEffect(() => {
    _getRecipeById(match.params.id);
  }, []);

  const handleDelete = id => {
    const r = window.confirm("Do you really want to delete your recipe?");
    if (r === true) {
      _deleteRecipe(id);
      history.push("/");
    }
  };

  if (loading) return <Spinner />;

  if (Object.keys(recipe).length === 0)
    return <h2>No recipe found by the given ID!</h2>;

  return (
    <React.Fragment>
      <h2>{recipe.name}</h2>
      <div className="row">
        <div className="col-md-3 col-sm">
          <h5>Recipe source: {recipe.source}</h5>
          <ul>
            {recipe.ingredients &&
              recipe.ingredients.map(ing => (
                <li key={ing._id}>
                  {ing.name +
                    " " +
                    ing.quantity +
                    (ing.metricUnit ? ing.metricUnit : "")}
                </li>
              ))}
          </ul>
          <p>
            {recipe.time > 60
              ? Math.floor(recipe.time / 60) +
                " hours, " +
                (recipe.time % 60) +
                " minutes"
              : recipe.time + " minutes"}
          </p>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(recipe._id)}
          >
            Delete Recipe
          </button>
        </div>
        <div className="col-sm">
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};

RecipeDetails.propTypes = {
  recipes: PropTypes.object.isRequired,
  _getRecipeById: PropTypes.func.isRequired,
  _deleteRecipe: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { _getRecipeById, _deleteRecipe }
)(RecipeDetails);
