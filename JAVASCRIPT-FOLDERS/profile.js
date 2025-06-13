import { db, auth } from "../firebase-config.js";
import { collection, getDocs} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

onAuthStateChanged(auth, async(user)=>{
  if(user){
    const userID = user.uid;
    const  recipesRef = collection(db, "users",  userID, "recipes")

    try {
      const querySnapshot  = await getDocs(recipesRef);
      let userRecipes = [];
    } catch (error) {
      
    }
  }
})