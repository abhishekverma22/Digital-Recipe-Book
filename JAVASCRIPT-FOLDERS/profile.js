import { db, auth } from "../firebase-config.js"
import {
  getDoc,
  getDocs,
  doc,
  collection,
  getFirestore
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

  let allPostsContainer = document.getElementById('all-posts');
  userRecipes.forEach((post) => {
    let div = document.createElement('div');
    div.className = "post-card"
    div.innerHTML = `
      <h4>${post.Title}</h4>
      <p class="category-p"><span>Category : </span>${post.Category}</p>
      <p><span>Date : </span>${post.CreatedAt}</p>
      <button onclick="seeDetails(${post})" class="see-details">See Details</button>
      <button onclcik="editData(${post.id})" class="edit-btn">Modify</button>
    
    `
    allPostsContainer.appendChild(div)
  })
}


// sort Posts by date 
function sortPost(userRecipesData) {
  let data = userRecipesData;

  console.log(userRecipesData)
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





