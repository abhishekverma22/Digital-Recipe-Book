import { db, auth } from "../firebase-config.js"
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js"

let userName = document.getElementById('username')


document.addEventListener("DOMContentLoaded", () => {
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let userDetails = await getDoc(doc(db, "users", user.uid));
      
      if (userDetails.exists()) {
        const getUsername = userDetails.data()
        userName.innerText = `${getUsername.name.firstName} ${getUsername.name.lastName}`
        
      }
    }

    
  })
  // function for fetch recipes 
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userID = user.uid;
      const recipesRef = collection(db, "users", userID, "recipes")
      
      let userRecipes = [];
      try {
        const querySnapshot = await getDocs(recipesRef);

        querySnapshot.forEach((doc) => {
          userRecipes.push({ id: doc.id, ...doc.data() });
        });
        displayData(userRecipes);     // all recipes are pass from function for displaing in UI.
      } catch (error) {
        console.log(`Error  getting  user recipes: `, error)
      }

      // show Total post in ui profile section
      document.getElementById('post-count').innerText = userRecipes.length

    } else {
      alert('User not Logged In....')
    }

  })
})


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


