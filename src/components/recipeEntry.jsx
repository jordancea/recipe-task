import React, { Fragment } from "react";
import Joi from "joi-browser";
import { getIngredients } from "../services/fakeIngredientsService";
import Form from "./common/form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { _addRecipe } from "../redux/actions/recipesActions";
import { withRouter } from "react-router-dom";

class RecipeEntry extends Form {
  state = {
    data: {
      name: "",
      source: "",
      ing_id: "",
      quantity: "",
      time: "",
      instructions: ""
    },
    ingredients: [],
    addedIngredients: [],
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    source: Joi.string()
      .required()
      .label("Source"),
    ing_id: Joi.string()
      .required()
      .label("Ingridients"),
    quantity: Joi.string()
      .required()
      .label("Quantity"),
    instructions: Joi.string()
      .required()
      .label("Instructions"),
    time: Joi.number()
      .required()
      .min(1)
      .label("Preparation Time")
  };

  componentDidMount() {
    const ingredients = getIngredients();
    this.setState({ ingredients });
  }

  doSubmit = () => {
    //TO DO
    const { name, source, time, instructions } = this.state.data;
    const recipe = {
      _id: Date.now().toString(),
      name,
      source,
      ingredients: this.state.addedIngredients,
      time,
      instructions
    };
    this.props._addRecipe(recipe, this.props.history);
  };

  addIngredient = e => {
    e.preventDefault();
    const addedIngredients = [...this.state.addedIngredients];
    const selectedIngredient = this.state.ingredients.find(
      item => item._id === this.state.data.ing_id
    );
    const alreadyAdded = this.state.addedIngredients.find(
      item => item.ing_id === selectedIngredient._id
    );
    if (alreadyAdded) return;
    addedIngredients.push({
      ing_id: this.state.data.ing_id,
      quantity: this.state.data.quantity,
      name: selectedIngredient.name,
      metric: selectedIngredient.metricUnit
    });

    this.setState({
      addedIngredients
    });
  };

  removeIngredient = (e, id) => {
    e.preventDefault();
    const addedIngredients = [...this.state.addedIngredients];
    const filteredIngredients = addedIngredients.filter(
      item => item.ing_id !== id
    );
    this.setState({ addedIngredients: filteredIngredients });
  };

  render() {
    return (
      <Fragment>
        <h1>Add Recipe</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("source", "Source")}
          <div className="add-recipe">
            {this.renderSelect("ing_id", "Ingridients", this.state.ingredients)}
            {this.renderInput("quantity", "Quantity")}
            <button
              disabled={
                this.state.data.ing_id && this.state.data.quantity ? null : true
              }
              className="btn btn-primary"
              onClick={e => this.addIngredient(e)}
            >
              Add Ingredient
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.addedIngredients &&
                this.state.addedIngredients.map(item => (
                  <tr key={item.ing_id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.metric ? item.metric : ""}</td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-danger"
                        onClick={e => this.removeIngredient(e, item.ing_id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {this.renderTextarea("instructions", "Instructions")}
          {this.renderInput("time", "Preparation time")}
          {this.renderButton("Add Recepie")}
        </form>
      </Fragment>
    );
  }
}

RecipeEntry.propTypes = {
  _addRecipe: PropTypes.func.isRequired
};

export default connect(
  null,
  { _addRecipe }
)(withRouter(RecipeEntry));
