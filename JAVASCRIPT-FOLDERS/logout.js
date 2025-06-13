import { auth } from "../firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

let logoutButton = document.getElementById('logout')

logoutButton.addEventListener('click', async () => {
try {
  // signout
    await signOut(auth);

    // clear all local/session Storage 
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to homepage and prevent back navigation
    window.location.replace("../index.html");

} catch (error) {
  
}

});