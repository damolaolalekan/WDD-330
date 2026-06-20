// ===================================
// MealPlanner.mjs
// ===================================

export default class MealPlanner{

constructor(){

this.days=[

"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
"Sunday"

];

this.storageKey="mealPlanner";

this.grid=document.getElementById("plannerGrid");

this.template=document.getElementById("plannerCard");

}

getMeals(){

return JSON.parse(

localStorage.getItem(this.storageKey)

)||{};

}

saveMeals(meals){

localStorage.setItem(

this.storageKey,

JSON.stringify(meals)

);

}

render(){

if(!this.grid) return;

const meals=this.getMeals();

this.grid.innerHTML="";

this.days.forEach(day=>{

const card=this.template.content.cloneNode(true);

card.querySelector(".day-name").textContent=day;

const input=card.querySelector(".meal-input");

input.value=meals[day]?.title || "";

card.querySelector(".save-meal")

.addEventListener("click",()=>{

meals[day]=input.value.trim();

this.saveMeals(meals);

alert(`${day} meal saved!`);

});

this.grid.appendChild(card);

});

this.enableClear();

}

enableClear(){

const btn=document.getElementById("clearPlanner");

if(!btn) return;

btn.addEventListener("click",()=>{

if(confirm("Clear entire meal planner?")){

localStorage.removeItem(this.storageKey);

this.render();

}

});

}

addMeal(recipe){

const meals=this.getMeals();

const empty=this.days.find(day=>!meals[day]);

if(empty){

meals[empty]=recipe.title;

this.saveMeals(meals);

}else{

alert("Planner is already full.");

}

}

}