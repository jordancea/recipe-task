export const ingredients = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Flour", metricUnit: "g" },
  { _id: "5b21ca3eeb7f6fbccd473814", name: "Peppers", metricUnit: "g" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Milk", metricUnit: "ml" },
  { _id: "5b21ca3eeb7f6fbccd471816", name: "Oil", metricUnit: "ml" },
  { _id: "5b21ca3eeb7f6fbccd471813", name: "Salt", metricUnit: "g" },
  { _id: "5b21ca3eeb7f6fbccd471821", name: "Sugar", metricUnit: "g" },
  { _id: "5b21ca3eeb7f6fbccd471822", name: "Eggs" },
  { _id: "5b21ca3eeb7f6fbccd471815", name: "Tomatoes", metricUnit: "g" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Cheese", metricUnit: "g" },
  { _id: "5b21ca3eeb7f6fbccd471811", name: "Potatoes", metricUnit: "g" },
  { _id: "5b21ca3eeb7f6fbccd471812", name: "Meat", metricUnit: "g" }
];

export function getIngredients() {
  return ingredients.filter(g => g);
}

export function getIngridient(id) {
  return ingredients.find(i => i._id === id);
}
