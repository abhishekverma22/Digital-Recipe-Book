import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAq0I9SLFOKDIT1MBE47yNH5LNzM2NUgDg",
  authDomain: "digital-recipenote-app.firebaseapp.com",
  projectId: "digital-recipenote-app",
  storageBucket: "digital-recipenote-app.firebasestorage.app",
  messagingSenderId: "487517409012",
  appId: "1:487517409012:web:a11b5baa6a7c4d36fbd8a1",
  measurementId: "G-7X29RYBZWR"
};

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);
