import { saveMealPlan, getMealPlan } from "./js/MealPlanner.mjs";

const days = ["mon","tue","wed","thu","fri","sat","sun"];

const existing = getMealPlan();

days.forEach(d => {
  document.getElementById(d).value = existing[d] || "";
});

document.getElementById("savePlan").addEventListener("click", () => {

  const plan = {};

  days.forEach(d => {
    plan[d] = document.getElementById(d).value;
  });

  saveMealPlan(plan);

  alert("Meal Plan Saved!");
});