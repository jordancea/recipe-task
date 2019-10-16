import React, { useEffect } from "react";
import "./App.css";
import RecipeEntry from "./components/recipeEntry";
import RecipeList from "./components/recipeList";
import RecipeDetails from "./components/recipeDetails";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import { Route, Switch, Redirect } from "react-router-dom";
//REDUX
import { Provider } from "react-redux";
import store from "./redux/store";
import { _getRecipes } from "./redux/actions/recipesActions";

const App = () => {
  useEffect(() => {
    store.dispatch(_getRecipes());
  }, []);

  return (
    <Provider store={store}>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/addRecipe" component={RecipeEntry} />
          <Route path="/recipeList" component={RecipeList} />
          <Route path="/recipeDetails/:id" component={RecipeDetails} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={RecipeList} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </Provider>
  );
};
export default App;
