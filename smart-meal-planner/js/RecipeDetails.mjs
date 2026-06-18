// ======================================
// RecipeDetails.mjs
// ======================================

import RecipeSearch from "./RecipeSearch.mjs";
import Favorites from "./Favorites.mjs";
import Storage from "./Storage.mjs";

export default class RecipeDetails {

    constructor() {

        this.api = new RecipeSearch();
        this.favorites = new Favorites();
        this.storage = new Storage();

        this.recipe = null;

    }

    /**
     * Initialize page
     */
    async init() {

        const params = new URLSearchParams(window.location.search);

        const recipeId = params.get("id");

        if (!recipeId) {

            this.showError("Recipe not found.");

            return;

        }

        this.recipe = await this.api.getRecipeDetails(recipeId);

        if (!this.recipe) {

            this.showError("Unable to load recipe.");

            return;

        }

        this.renderRecipe();

        this.attachEvents();

    }

    /**
     * Display recipe
     */
    renderRecipe() {

        document.getElementById("recipeImage").src =
            this.recipe.image;

        document.getElementById("recipeTitle").textContent =
            this.recipe.title;

        document.getElementById("readyTime").textContent =
            `${this.recipe.readyInMinutes} min`;

        document.getElementById("servings").textContent =
            `${this.recipe.servings}`;

        document.getElementById("healthScore").textContent =
            `${this.recipe.healthScore}`;

        document.getElementById("summary").innerHTML =
            this.recipe.summary;

        this.renderIngredients();

        this.renderInstructions();

        this.renderNutrition();

    }

    /**
     * Ingredients
     */
    renderIngredients() {

        const list = document.getElementById("ingredients");

        list.innerHTML = "";

        this.recipe.extendedIngredients.forEach(item => {

            const li = document.createElement("li");

            li.textContent =
                `${item.amount} ${item.unit} ${item.name}`;

            list.appendChild(li);

        });

    }

    /**
     * Instructions
     */
    renderInstructions() {

        const container =
            document.getElementById("instructions");

        container.innerHTML = "";

        if (!this.recipe.analyzedInstructions.length) {

            container.innerHTML =
                "<p>No instructions available.</p>";

            return;

        }

        this.recipe.analyzedInstructions[0].steps.forEach(step => {

            const div = document.createElement("div");

            div.className = "instruction-step";

            div.innerHTML = `

                <h4>Step ${step.number}</h4>

                <p>${step.step}</p>

            `;

            container.appendChild(div);

        });

    }

    /**
     * Nutrition
     */
    renderNutrition() {

        if (!this.recipe.nutrition) return;

        const nutrition =
            document.getElementById("nutrition");

        nutrition.innerHTML = "";

        this.recipe.nutrition.nutrients
            .slice(0,8)
            .forEach(nutrient => {

                const card =
                    document.createElement("div");

                card.className =
                    "nutrition-card";

                card.innerHTML = `

                    <h4>${nutrient.name}</h4>

                    <p>${nutrient.amount.toFixed(1)}
                    ${nutrient.unit}</p>

                `;

                nutrition.appendChild(card);

            });

    }

    /**
     * Buttons
     */
    attachEvents() {

        const favButton =
            document.getElementById("favoriteBtn");

        const plannerButton =
            document.getElementById("plannerBtn");

        favButton.addEventListener("click", () => {

            this.favorites.add(this.recipe);

            alert("Recipe added to favorites!");

        });

        plannerButton.addEventListener("click", () => {

            this.storage.addMeal(this.recipe);

            alert("Recipe added to meal planner!");

        });

    }

    /**
     * Error
     */
    showError(message) {

        document.body.innerHTML = `

            <div class="error-page">

                <h2>${message}</h2>

                <a href="index.html">

                    ← Back Home

                </a>

            </div>

        `;

    }

}