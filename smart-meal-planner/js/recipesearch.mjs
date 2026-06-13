const API_KEY = "bbefe1f05a0a4a8bbff1597c0c10b43d";

export async function searchRecipes(query){

    const url =
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    return data.results;
}