import { searchRecipes }
from "./recipesearch.mjs";

import { createRecipeCard }
from "./recipecard.mjs";

const searchBtn =
document.getElementById("searchBtn");

const searchInput =
document.getElementById("searchInput");

const recipeContainer =
document.getElementById("recipeContainer");

searchBtn.addEventListener("click", async ()=>{

    const query =
    searchInput.value.trim();

    if(!query) return;

    const recipes =
    await searchRecipes(query);

    displayRecipes(recipes);

});

function displayRecipes(recipes){

    recipeContainer.innerHTML = "";

    recipes.forEach(recipe=>{

        recipeContainer.innerHTML +=
        createRecipeCard(recipe);

    });

}