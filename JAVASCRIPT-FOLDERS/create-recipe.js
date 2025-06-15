import { db, auth } from "../firebase-config.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js"
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js"


let recipeTitle = document.getElementById('recipe-title');
let category = document.getElementById('category');
let description = document.getElementById('description');
let ingredients = document.getElementsByName('ingredients');
let preparationSteps = document.getElementById('preparation-steps');
let hours = document.getElementById('hour');
let minute = document.getElementById('minute');
let difficulty = document.getElementById('difficulty');
let recipeImage = document.getElementById('recipe-image')
let addIngredientButton = document.getElementById('add-ingredient-btn');
let postButton = document.getElementById('post-btn');
let ingredientSection = document.getElementById('ingredient-section');

// current date in dd-mm-yyyy
let today = new Date();
let formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;


document.addEventListener('DOMContentLoaded', () => {

  // This function is  for add new input pair before add button 
  if (addIngredientButton) {

    addIngredientButton.addEventListener('click', () => {

      let newInput = document.createElement('input')
      newInput.placeholder = "Ingredient with Quantity"
      newInput.name = "ingredients"
      newInput.type = "text"
      ingredientSection.insertBefore(newInput, addIngredientButton)
    });
  }  //if addIngredientButton


  // post button { add recipes in databse}
  if (postButton) {
    postButton.addEventListener('click', () => {
      // collect ingredients as array. {array.form Converts that NodeList into a real array  \\ map -> goes through each input and extract value  || trim remove white space  || filter check is any input field is not empty}
      let ingredientsList = Array.from(ingredients).map(input => input.value.trim()).filter(val => val !== "");

      //  collect other from data in object form

      const recipeData = {
        Title: recipeTitle.value.trim(),
        Category: category.value.trim(),
        Description: description.value.trim(),
        Ingredients: ingredientsList,
        PreparationSteps: preparationSteps.value.trim(),
        CookingTime: {
          Hour: hours.value.trim() || 0,
          Minute: minute.value.trim() || 0
        },
        Difficulty: difficulty.value,
        ImageUrl: recipeImage.files[0] ? recipeImage.files[0].name : "",
        CreatedAt: formattedDate
      }


      console.log(recipeData)
      // Check if user is logged in
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userID = user.uid;
          try {
            const recipeRef = collection(db, "users", userID, "recipes");
            await addDoc(recipeRef, recipeData);
            alert("Recipe posted successfully!");
            recipeTitle.value = ""
            category.value = ""
            description.value = ""
            ingredients.value = ""
            preparationSteps.value = ""
            hours.value = ""
            minute.value = ""
            difficulty.value = ""
            recipeImage.value = ""
            addIngredientButton.value = ""
            postButton.value = ""
            ingredientSection.value = ""

          } catch (error) {
            console.log(`Error adding recipes :  ${error}`)
            alert("Error adding recipe");
          }
        } else {
          alert('Please login to post a recipe.');
        }
      })
    }); //    postButton.addEventListener
  }  // if postButton 

});   // DOMContentLoaded





  // Toggle nav on mobile
    const hamburger = document.querySelector(".hamburger");
    const navItems = document.querySelector(".nav-items");

    hamburger.addEventListener("click", () => {
      navItems.classList.toggle("active");
    });
