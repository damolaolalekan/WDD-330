import RecipeSearch from "./RecipeSearch.mjs";
import { createRecipeCard } from "./RecipeCard.mjs";
import Favorites from "./Favorites.mjs";
import ThemeManager from "./ThemeManager.mjs";
console.log("main.js loaded");

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

    console.log(e.key);

    if (e.key !== "Enter") return;

    const query = searchInput.value.trim();

    console.log("Searching:", query);

    const recipes = await api.searchRecipes(query);

    console.log(recipes);

    displayRecipes(recipes);

});

// Load featured recipes
window.addEventListener("DOMContentLoaded", async () => {

    const recipes =
    await api.getRandomRecipes();

    displayRecipes(recipes);

});

function displayRecipes(recipes){

    console.log(recipes);

    recipeGrid.innerHTML="";

    recipes.forEach(recipe=>{

        recipeGrid.innerHTML += createRecipeCard(recipe);

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

const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", async () => {

    const recipes = await api.getRandomRecipes(7);

    if (!recipes.length) {
        alert("Unable to generate meal plan.");
        return;
    }

    const mealPlan = {};

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    days.forEach((day, index) => {

        mealPlan[day] = {
            id: recipes[index].id,
            title: recipes[index].title,
            image: recipes[index].image
        };

    });

    localStorage.setItem(
        "mealPlanner",
        JSON.stringify(mealPlan)
    );

    alert("Weekly meal plan generated!");

    window.location.href = "planner.html";

});