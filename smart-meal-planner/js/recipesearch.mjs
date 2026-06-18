// =====================================
// RecipeSearch.mjs
// Handles all Spoonacular API requests
// =====================================

export default class RecipeSearch {

    constructor() {

        this.API_KEY = "bbefe1f05a0a4a8bbff1597c0c10b43d";

        this.BASE_URL = "https://api.spoonacular.com/recipes";

    }

    /**
     * Generic fetch helper
     */
    async fetchData(url) {

        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch recipes.");
            }

            return await response.json();

        } catch (error) {

            console.error(error);

            return null;

        }

    }

    /**
     * Search recipes
     */
    async searchRecipes(query) {

        const url =
            `${this.BASE_URL}/complexSearch?query=${encodeURIComponent(query)}&number=12&addRecipeInformation=true&apiKey=${this.API_KEY}`;

        const data = await this.fetchData(url);

        return data?.results || [];

    }

    /**
     * Featured recipes
     */
    async getRandomRecipes(number = 8) {

        const url =
            `${this.BASE_URL}/random?number=${number}&apiKey=${this.API_KEY}`;

        const data = await this.fetchData(url);

        return data?.recipes || [];

    }

    /**
     * Recipe Details
     */
    async getRecipeDetails(id) {

        const url =
            `${this.BASE_URL}/${id}/information?includeNutrition=true&apiKey=${this.API_KEY}`;

        return await this.fetchData(url);

    }

    /**
     * Nutrition
     */
    async getNutrition(id) {

        const url =
            `${this.BASE_URL}/${id}/nutritionWidget.json?apiKey=${this.API_KEY}`;

        return await this.fetchData(url);

    }

    /**
     * Similar Recipes
     */
    async getSimilarRecipes(id) {

        const url =
            `${this.BASE_URL}/${id}/similar?number=4&apiKey=${this.API_KEY}`;

        return await this.fetchData(url);

    }

    /**
     * Vegetarian Recipes
     */
    async getVegetarianRecipes() {

        const url =
            `${this.BASE_URL}/complexSearch?diet=vegetarian&number=12&addRecipeInformation=true&apiKey=${this.API_KEY}`;

        const data = await this.fetchData(url);

        return data?.results || [];

    }

    /**
     * Vegan Recipes
     */
    async getVeganRecipes() {

        const url =
            `${this.BASE_URL}/complexSearch?diet=vegan&number=12&addRecipeInformation=true&apiKey=${this.API_KEY}`;

        const data = await this.fetchData(url);

        return data?.results || [];

    }

    /**
     * Keto Recipes
     */
    async getKetoRecipes() {

        const url =
            `${this.BASE_URL}/complexSearch?diet=ketogenic&number=12&addRecipeInformation=true&apiKey=${this.API_KEY}`;

        const data = await this.fetchData(url);

        return data?.results || [];

    }

    /**
     * Breakfast Recipes
     */
    async getBreakfastRecipes() {

        const url =
            `${this.BASE_URL}/complexSearch?type=breakfast&number=12&addRecipeInformation=true&apiKey=${this.API_KEY}`;

        const data = await this.fetchData(url);

        return data?.results || [];

    }

    /**
     * Lunch Recipes
     */
    async getLunchRecipes() {

        const url =
            `${this.BASE_URL}/complexSearch?type=lunch&number=12&addRecipeInformation=true&apiKey=${this.API_KEY}`;

        const data = await this.fetchData(url);

        return data?.results || [];

    }

    /**
     * Dinner Recipes
     */
    async getDinnerRecipes() {

        const url =
            `${this.BASE_URL}/complexSearch?type=dinner&number=12&addRecipeInformation=true&apiKey=${this.API_KEY}`;

        const data = await this.fetchData(url);

        return data?.results || [];

    }

    /**
     * Dessert Recipes
     */
    async getDessertRecipes() {

        const url =
            `${this.BASE_URL}/complexSearch?type=dessert&number=12&addRecipeInformation=true&apiKey=${this.API_KEY}`;

        const data = await this.fetchData(url);

        return data?.results || [];

    }

    /**
     * Autocomplete Search
     */
    async autoComplete(query) {

        const url =
            `${this.BASE_URL}/autocomplete?query=${encodeURIComponent(query)}&number=8&apiKey=${this.API_KEY}`;

        return await this.fetchData(url);

    }

}