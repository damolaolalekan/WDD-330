// =====================================
// ShoppingList.mjs
// =====================================

export default class ShoppingList {

    constructor() {

        this.list = document.getElementById("shoppingList");

        this.storageKey = "mealPlanner";

    }

    getMeals() {

        return JSON.parse(

            localStorage.getItem(this.storageKey)

        ) || {};

    }

    render() {

        if (!this.list) return;

        this.list.innerHTML = "";

        const meals = this.getMeals();

        const values = Object.values(meals);

        if (values.length === 0) {

            this.list.innerHTML = `

            <li class="shopping-item">

                No meals planned yet.

            </li>

            `;

            return;

        }

        values.forEach(recipe => {

            const li = document.createElement("li");

            li.className = "shopping-item";

            li.innerHTML = `

                <label>

                    <input type="checkbox">

                    ${recipe}

                </label>

            `;

            const check = li.querySelector("input");

            check.addEventListener("change", () => {

                li.classList.toggle("checked");

            });

            this.list.appendChild(li);

        });

        this.enableButtons();

    }

    enableButtons() {

        const clearBtn =

            document.getElementById("clearList");

        const exportBtn =

            document.getElementById("exportList");

        clearBtn.addEventListener("click", () => {

            this.list.innerHTML = "";

        });

        exportBtn.addEventListener("click", () => {

            window.print();

        });

    }

}