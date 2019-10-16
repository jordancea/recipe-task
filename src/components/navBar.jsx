import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/addRecipe">
              Add Recipe
            </NavLink>
          </div>
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/recipeList">
              Recipe List
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
