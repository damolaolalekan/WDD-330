// ================================
// Favorites.mjs
// ================================

export default class Favorites {

    constructor() {

        this.storageKey = "favoriteRecipes";

        this.grid = document.getElementById("favoritesGrid");

        this.template = document.getElementById("favoriteTemplate");

    }

    // =============================

    getAll() {

        return JSON.parse(

            localStorage.getItem(this.storageKey)

        ) || [];

    }

    // =============================

    save(recipes) {

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(recipes)

        );

    }

    // =============================

    add(recipe) {

        const recipes = this.getAll();

        const exists = recipes.some(

            r => r.id === recipe.id

        );

        if (!exists) {

            recipes.push(recipe);

            this.save(recipes);

        }

    }

    // =============================

    remove(id) {

        const recipes = this.getAll()

            .filter(recipe => recipe.id !== id);

        this.save(recipes);

        this.render();

    }

    // =============================

    render() {

        if (!this.grid) return;

        this.grid.innerHTML = "";

        const recipes = this.getAll();

        if (recipes.length === 0) {

            this.grid.innerHTML = `

                <h2>No favorite recipes yet.</h2>

            `;

            return;

        }

        recipes.forEach(recipe => {

            const card =

                this.template.content.cloneNode(true);

            card.querySelector(".recipe-image").src =

                recipe.image;

            card.querySelector(".recipe-title").textContent =

                recipe.title;

            card.querySelector(".recipe-time").textContent =

                recipe.readyInMinutes

                ? recipe.readyInMinutes + " min"

                : "20 min";

            card.querySelector(".view-btn")

                .addEventListener("click", () => {

                    location.href =

                    `recipe.html?id=${recipe.id}`;

                });

            card.querySelector(".remove-btn")

                .addEventListener("click", () => {

                    this.remove(recipe.id);

                });

            this.grid.appendChild(card);

        });

        this.enableSearch();

    }

    // =============================

    enableSearch() {

        const input =

            document.getElementById("favoriteSearch");

        if (!input) return;

        input.addEventListener("keyup", () => {

            const text =

                input.value.toLowerCase();

            document

                .querySelectorAll(".recipe-card")

                .forEach(card => {

                    const title =

                        card.querySelector("h3")

                        .textContent

                        .toLowerCase();

                    card.style.display =

                        title.includes(text)

                        ? "block"

                        : "none";

                });

        });

    }

}