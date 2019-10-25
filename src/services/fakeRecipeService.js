import { getIngridient } from "./fakeIngredientsService";

const recipes = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "Salty Pancakes",
    source: "TV",
    ingredients: [
      {
        ing_id: "5b21ca3eeb7f6fbccd471820",
        quantity: 300
      },
      { ing_id: "5b21ca3eeb7f6fbccd471822", quantity: 2 },
      {
        ing_id: "5b21ca3eeb7f6fbccd471816",
        quantity: 50
      },
      {
        ing_id: "5b21ca3eeb7f6fbccd471813",
        quantity: 5
      },
      {
        ing_id: "5b21ca3eeb7f6fbccd471818",
        quantity: 500
      }
    ],
    time: 25,
    instructions:
      "Whisk milk, eggs, oil, and salt together in a bowl.Slowly whisk flour into wet ingredients until incorporated.Let batter rest for 1 hour; stir again.Heat a lightly oiled griddle over medium- high heat.Drop batter by large spoonfuls onto the griddle and cook until bubbles form and the edges are dry, 2 to 4 minutes.Flip and cook until browned on the other side, 2 to 4 more minutes.Repeat with remaining batter."
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "Fried Potatoes",
    source: "Internet",
    ingredients: [
      {
        ing_id: "5b21ca3eeb7f6fbccd471816",
        quantity: 100
      },
      {
        ing_id: "5b21ca3eeb7f6fbccd471811",
        quantity: 400
      },
      {
        ing_id: "5b21ca3eeb7f6fbccd471813",
        quantity: 5
      }
    ],
    time: 10,
    instructions:
      "Slice potatoes into coins.In a large skillet over medium-high heat, heat oils. Add potatoes and salt. Cook, undisturbed, until potatoes are golden and crusty underneath, 4 to 5 minutes"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    name: "STREAK O’ LEAN",
    source: "FB",
    ingredients: [
      {
        ing_id: "5b21ca3eeb7f6fbccd471812",
        quantity: 1000
      },
      {
        ing_id: "5b21ca3eeb7f6fbccd471820",
        quantity: 500
      },
      {
        ing_id: "5b21ca3eeb7f6fbccd471814",
        quantity: 500
      },
      {
        ing_id: "5b21ca3eeb7f6fbccd471818",
        quantity: 200
      },
      {
        ing_id: "5b21ca3eeb7f6fbccd471816",
        quantity: 100
      }
    ],
    time: 75,
    instructions:
      "Place the sliced salt pork in a container and cover with milk or buttermilk. Let sit for several hours to draw out some of the salt. Remove the salt pork from the milk. Discard the milk.Pepper each slice of salt pork and then dredge lightly in flour.Add peanut oil to a depth of a ¼ inch to a heavy skillet.Heat the oil over medium high heat.Carefully add the prepared salt pork slices to the hot oil.Cook, turning once, until lightly browned and cooked through"
  }
];

export function getRecipe(id) {
  return recipes.find(r => r._id === id);
}
export function getRecipes() {
  return recipes.map(recipe => {
    return {
      ...recipe,
      ingredients: [
        ...recipe.ingredients.map(ing => ({
          ...getIngridient(ing.ing_id),
          quantity: ing.quantity
        }))
      ]
    };
  });
}
export function getRecipeById(id) {
  const recipe = recipes.find(r => r._id === id);
  return {
    ...recipe,
    ingredients: [
      ...recipe.ingredients.map(ing => ({
        ...getIngridient(ing.ing_id),
        quantity: ing.quantity
      }))
    ]
  };
}

export function addRecipe(recipe) {
  let recipeInDb = recipes.find(r => r._id === recipe._id) || {};
  recipeInDb.name = recipe.name;
  recipeInDb.source = recipe.source;
  recipeInDb.ingredients = recipe.ingredients;
  recipeInDb.time = recipe.time;
  recipeInDb.instructions = recipe.instructions;

  if (!recipeInDb._id) {
    recipeInDb._id = Date.now().toString();
    recipes.push(recipeInDb);
  }
  console.log(recipeInDb);
  return recipeInDb;
}

export function removeRecipe(_id) {
  let recipeInDb = recipes.find(r => r._id === _id);
  recipes.splice(recipes.indexOf(recipeInDb), 1);
  return recipeInDb;
}
