import { db } from "../firebase-config.js"
import { getFirestore, collectionGroup, getDocs } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js"

let recipeCardsContainer = document.querySelector('.recipe-cards')

// fetch all data from Firestore
async function getAllRecipes() {

  const recipesSnapshot = await getDocs(collectionGroup(db, "recipes"));
  const allRecipes = []

  recipesSnapshot.forEach((recipe) => {
    allRecipes.push({ id: recipe.id, ...recipe.data() })
  });

  displayRecipes(allRecipes)

}
 getAllRecipes() 

// display function
function displayRecipes(allRecipes) {
  allRecipes.forEach((recipe) => {
    let cardDiv = document.createElement('div')
    cardDiv.className = "card"

    console.log(recipe)
    cardDiv.innerHTML = `
            <div class="user-details">
            <div class="user-profile-photo">
              <img src="../ASSETS/profile.png" alt="user profile photo">
            </div>
            <div class="user-name-date">
              <h2>Abhishek verma</h2>
              <p>${recipe.CreatedAt}</p>
            </div>
            <button>Follow</button>
          </div>
          <div class="recipe-media">
            <img src="../ASSETS/dinner.jpg" alt="recipe-media">
          </div>
          <div class="controls">
            <div class="like">
              <i class="fa-regular fa-heart" style="color: #ff1a1a;"></i>
              <p><span>20 </span>Likes</p>
            </div>
            <div class="share">
              <i class="fa-solid fa-share" style="color: #ffc800;"></i>
              <p>Share</p>
            </div>
            <h2>Recipe Title</h2>
            <h2><i class="fa-regular fa-bookmark" style="color: #fa7900;"></i></h2>
          </div>
          <div class="descriptionn">
            <p>${recipe.Description}</p>
          </div>
  
  `;

  recipeCardsContainer.appendChild(cardDiv)

  })

}