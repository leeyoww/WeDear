import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBfPdkDg0TE9nypjCr9WDjHsDG6IGH2jLs",
    authDomain: "e-deez-nuts.firebaseapp.com",
    databaseURL: "https://e-deez-nuts-default-rtdb.firebaseio.com",
    projectId: "e-deez-nuts",
    storageBucket: "e-deez-nuts.appspot.com",
    messagingSenderId: "697154537749",
    appId: "1:697154537749:web:f837eccbd4d244871f011c",
    measurementId: "G-PNJHWV1S79"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM Elements
const loginButton = document.getElementById('login-btn');
const logoutButton = document.getElementById('logout-btn');
const addPostButton = document.getElementById('add-post-btn');
const authorField = document.getElementById('post-author');

// Log in with Google
loginButton.addEventListener('click', async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please try again.");
  }
});

// Log out
logoutButton.addEventListener('click', async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Logout failed. Please try again.");
  }
});

// Monitor Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User logged in
    loginButton.classList.add('d-none');
    logoutButton.classList.remove('d-none');
    addPostButton.classList.remove('d-none');
    authorField.value = user.displayName;
    console.log("User logged in:", authorField.value)
    console.log("Auth Activated")
  } else {
    // User logged out
    loginButton.classList.remove('d-none');
    logoutButton.classList.add('d-none');
    addPostButton.classList.add('d-none');
    authorField.value = '';
  }
});
