import {db, auth} from "../firebase-config.js"
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js"


let userName = document.getElementById('username')


document.addEventListener("DOMContentLoaded", ()=>{

onAuthStateChanged(auth, async(user)=>{
  if(user){
    let userDetails = await getDoc(doc(db, "users", user.uid));

    if(userDetails.exists()){
      const getUsername = userDetails.data()
      userName.innerText = `${getUsername.name.firstName} ${getUsername.name.lastName}`

    }

  }
})
   


})