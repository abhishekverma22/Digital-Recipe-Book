import { auth } from "../firebase-config.js"
import { signInWithEmailAndPassword , signOut} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-button');

  if (loginButton) {
    loginButton.addEventListener('click', async () => {
      const email = document.getElementById('signin-email').value;
      const password = document.getElementById('signin-password').value;


      // validation insure all inputs are fill
      if (!email || !password) {
        return alert("Oops!  Some Details are Missing.")
      }


      // sign-in  using email password.
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect the user to 
        window.location.replace("../HTML-FOLDERS/after-login.html")
      } catch (error) {
        document.getElementById('login-message').innerText = error.message
      }
    })



  }   // if loginButton


});             // DOMContentLoaded



