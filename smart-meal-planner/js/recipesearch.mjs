const API_KEY = "YOUR_SPOONACULAR_KEY";

export async function searchRecipes(query){

    const url =
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    return data.results;
}