// ===================================
// ThemeManager.mjs
// ===================================

export default class ThemeManager {

    constructor() {

        this.button =
            document.getElementById("themeToggle");

    }

    initialize() {

        const savedTheme =
            localStorage.getItem("theme");

        if (savedTheme === "dark") {

            document.body.classList.add("dark");

            this.updateIcon(true);

        }

        if (this.button) {

            this.button.addEventListener(

                "click",

                () => this.toggle()

            );

        }

    }

    toggle() {

        document.body.classList.toggle("dark");

        const dark =
        document.body.classList.contains("dark");

        localStorage.setItem(

            "theme",

            dark ? "dark" : "light"

        );

        this.updateIcon(dark);

    }

    updateIcon(isDark) {

        if (!this.button) return;

        this.button.innerHTML = isDark

            ? `<i class="fa-solid fa-sun"></i>`

            : `<i class="fa-solid fa-moon"></i>`;

    }

}