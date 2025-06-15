import { db, auth } from "../firebase-config.js"
import {
  getDoc,
  getDocs,
  doc,
  collection,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js"

let userName = document.getElementById('username')


document.addEventListener("DOMContentLoaded", () => {

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let userDetails = await getDoc(doc(db, "users", user.uid));

      // show user name 
      if (userDetails.exists()) {
        const getUsername = userDetails.data()
        userName.innerText = `${getUsername.name.firstName} ${getUsername.name.lastName}`
      };

      //  get Recipes from User account
      getUserRecipes(user.uid);
    };


  });

});
let userRecipesCollection = [];
// Get Recipe 
async function getUserRecipes(UserID) {
  const recipesRef = collection(db, `users/${UserID}/recipes`);
  const querySnapshot = await getDocs(recipesRef)

  querySnapshot.forEach((recipe) => {
    userRecipesCollection.push({ id: recipe.id, ...recipe.data() });
  });
  sortPost(userRecipesCollection)
  // show Total post in ui profile section
  document.getElementById('post-count').innerText = userRecipesCollection.length
}

// recipe display in UI
async function displayData(userRecipes) {
  const allPostsContainer = document.getElementById('all-posts');

  userRecipes.forEach((post) => {
    const div = document.createElement('div');
    div.className = "post-card";
    div.innerHTML = `
        <h4>${post.Title}</h4>
        <p class="category-p"><span>Category : </span>${post.Category}</p>
        <p><span>Date : </span>${post.CreatedAt}</p>
        <button  class="see-details">See Details</button>
        <button onclick="modifyData()" class="edit-btn">Modify</button>
      `;
    allPostsContainer.appendChild(div);
  });


 
}




// sort Posts by date 
function sortPost(userRecipesData) {
  let data = userRecipesData;
  let sortedData = data.sort((a, b) => {
    let dateA = parseDate(a.CreatedAt);
    let dateB = parseDate(b.CreatedAt);


    return dateB - dateA;
  });

  displayData(sortedData)

};

// Convert "dd-mm-yyyy" to Date and then sort
function parseDate(CreatedAt) {
  const [dd, mm, yyyy] = CreatedAt.split('-');
  return new Date(`${yyyy}-${mm}-${dd}`)
}




//  update recipes





