export function createreciperard(recipe){

    return `
    <div class="recipe-card">

        <img
            src="${recipe.image}"
            alt="${recipe.title}"
        >

        <h3>${recipe.title}</h3>

        <p>ID: ${recipe.id}</p>

    </div>
    `;
}