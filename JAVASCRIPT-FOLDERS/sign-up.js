import { auth, db } from "../firebase-config.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
  const registerButton = document.getElementById('register-button');
  const checkBox = document.getElementById('checkbox')

  if (registerButton) {
    registerButton.addEventListener('click', async () => {
      const firstName = document.getElementById('signup-first-name').value;
      const lastName = document.getElementById('signup-last-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;
      const checkBox = document.getElementById('checkbox').checked;

      // validation insure all inputs are fill

      if (!firstName || !lastName || !email || !password || !confirmPassword || !checkBox) {
        return alert("Oops!  Some Details are Missing.")
      }

      // insure password and confirm password are same
      if (password !== confirmPassword) {
        document.getElementById('signup-password').style.border = " 2px solid red";
        document.getElementById('signup-confirm-password').style.border = " 2px solid red";
        return;

      } else {

        document.getElementById('signup-password').style.border = "1px solid #ccc";
        document.getElementById('signup-confirm-password').style.border = " 1px solid #ccc";
     
        //  data store in object form 
        let userDetails = {
          name: {
            firstName: firstName,
            lastName: lastName
          },
          email: email
        }
        // create new account and data store in Firebase
        try {
          const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
          await setDoc(doc(db, "users", userCredentials.user.uid), userDetails);

          // Redirect  the user to after-login-page
          window.location.replace("../index.html")

        } catch (error) {
          alert(error.message)

        }
      }




    })



  }   // if registerButton


});             // DOMContentLoaded