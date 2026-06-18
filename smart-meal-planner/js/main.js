import { searchRecipes }
from "./recipesearch.mjs";

import { createRecipeCard }
from "./recipecard.mjs";

import { addFavorite}
from "./favorites.mjs";

import { initTheme, toggleTheme } from "./ThemeManager.mjs";

initTheme();

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

document.addEventListener("click", (event) => {
    if (
        event.target.classList.contains(
            "favorite-btn"
        )
    ) {
        const recipe = {
            id: event.target.dataset.id,
            title: event.target.dataset.title,
            image: event.target.dataset.image
        };

        addFavorite(recipe);

        alert("Recipe saved!");
    }
});

document.getElementById("themeToggle")
.addEventListener("click", toggleTheme);