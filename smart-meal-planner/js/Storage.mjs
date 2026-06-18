// ==========================================
// Storage.mjs
// Central Local Storage Manager
// ==========================================

export default class Storage {

    constructor() {

        this.FAVORITES = "favoriteRecipes";
        this.PLANNER = "mealPlanner";
        this.THEME = "theme";

    }

    // ==========================
    // Generic
    // ==========================

    get(key) {

        return JSON.parse(localStorage.getItem(key));

    }

    set(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    }

    remove(key) {

        localStorage.removeItem(key);

    }

    clearAll() {

        localStorage.clear();

    }

    // ==========================
    // Favorites
    // ==========================

    getFavorites() {

        return this.get(this.FAVORITES) || [];

    }

    saveFavorites(data) {

        this.set(this.FAVORITES, data);

    }

    // ==========================
    // Meal Planner
    // ==========================

    getPlanner() {

        return this.get(this.PLANNER) || {};

    }

    savePlanner(data) {

        this.set(this.PLANNER, data);

    }

    addMeal(recipe) {

        const planner = this.getPlanner();

        const days = [

            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"

        ];

        const emptyDay = days.find(day => !planner[day]);

        if (emptyDay) {

            planner[emptyDay] = recipe;

            this.savePlanner(planner);

        }

    }

    // ==========================
    // Theme
    // ==========================

    getTheme() {

        return localStorage.getItem(this.THEME);

    }

    saveTheme(theme) {

        localStorage.setItem(
            this.THEME,
            theme
        );

    }

}