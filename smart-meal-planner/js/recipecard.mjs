export function createreciperard(recipe){

    return `
    <div class="recipe-card">

        <a href="recipe.html?id=${recipe.id}">
        <img src="${recipe.image}" alt="${recipe.title}">
      </a>

        <h3>${recipe.title}</h3>

        <button class="favorite-btn"
              data-id="${recipe.id}"
              data-title="${recipe.title}"
              data-image="${recipe.image}">
        ❤️ Favorite
      </button>

    </div>
    `;
}