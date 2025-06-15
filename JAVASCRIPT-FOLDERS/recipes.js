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

  filteredRecipe(allRecipes);
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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ea in iusto natus ab eos non iure
            quisquam
              dolorum. Illo ut harum dignissimos laudantium quidem possimus, facere placeat voluptatem ex quae quaerat
              atque unde obcaecati distinctio accusamus. Provident, sapiente at.</p>
              </div>
  `;
    recipeCardsContainer.appendChild(cardDiv)
  })
}

let mealTypes = document.getElementById('meal-types');
mealTypes.addEventListener('change',()=>{
  
function filteredRecipe(allRecipes) {
  let recipes = allRecipes
  let filtered = recipes.filter((recipe) => {
    return recipe.Title === mealTypes.value
  })

  displayRecipes(filtered)
}

})

