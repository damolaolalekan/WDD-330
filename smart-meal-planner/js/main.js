import RecipeSearch from "./RecipeSearch.mjs";
import { createRecipeCard } from "./RecipeCard.mjs";
import Favorites from "./Favorites.mjs";
import ThemeManager from "./ThemeManager.mjs";

const api = new RecipeSearch();
const favorites = new Favorites();

const theme = new ThemeManager();
theme.initialize();

const searchInput =
document.getElementById("searchInput");

const recipeGrid =
document.getElementById("recipeGrid");

// Search when Enter is pressed
searchInput.addEventListener("keyup", async (e) => {

    if (e.key !== "Enter") return;

    const query = searchInput.value.trim();

    if (!query) return;

    const recipes =
    await api.searchRecipes(query);

    displayRecipes(recipes);

});

// Load featured recipes
window.addEventListener("DOMContentLoaded", async () => {

    const recipes =
    await api.getRandomRecipes();

    displayRecipes(recipes);

});

function displayRecipes(recipes){

    recipeGrid.innerHTML="";

    recipes.forEach(recipe=>{

        recipeGrid.innerHTML +=
        createRecipeCard(recipe);

    });

}

document.addEventListener("click",(event)=>{

    if(event.target.classList.contains("favorite-btn")){
        
        const card =
        event.target.closest(".recipe-card");

        favorites.add({

            id:event.target.dataset.id,

            title:event.target.dataset.title,

            image:event.target.dataset.image,

            readyInMinutes:20

        });

        alert("Recipe added to Favorites!");

    }

});