import { db,  auth } from "../firebase-config.js"

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
let minutes = document.getElementById('minutes');
let difficulty = document.getElementById('difficulty');
let recipeImage = document.getElementById('recipe-image')
let addIngredientButton = document.getElementById('add-ingredient-btn');
let postButton = document.getElementById('post-btn');
let ingredientSection = document.getElementById('ingredient-section')


document.addEventListener('DOMContentLoaded', () => {


  // This function is  for add new input pair before add button 
  if (addIngredientButton) {
    addIngredientButton.addEventListener('click', () => {
      let newInput = document.createElement('input')
      newInput.placeholder = "Ingredient with Quantity"
      newInput.name = "ingredients"
      newInput.type = "text"
      let buttons = document.createElement('button')
      buttons.innerText = "delete button"
      ingredientSection.appendChild(buttons)
      ingredientSection.insertBefore(newInput, addIngredientButton)
    });


    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let currentUser = user;
        console.log(currentUser)


        const userDetails = await getDoc(doc(db, "users", currentUser.uid));

        if(userDetails.exists()){
          const data = userDetails.data()
          console.log(data.name)
        }
      }


    })
  }  //if addIngredientButton






});   // DOMContentLoaded