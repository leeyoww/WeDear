// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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
const db = getFirestore(app);

// Render posts
const renderPosts = (querySnapshot) => {
    const postContainer = document.getElementById('post-feed');
    postContainer.innerHTML = ""; // Clear previous content
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      postContainer.innerHTML += `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${post.author || "Anonymous"}</h5>
            <p class="card-text">${post.content}</p>
          </div>
        </div>`;
    });
  };
  
  // Real-time listener (only once)
  const initializePostListener = () => {
    const postCollection = collection(db, 'test');
    onSnapshot(postCollection, (querySnapshot) => {
      renderPosts(querySnapshot); // Render posts only once per update
    });
  };
  
  // Add a new post
  const addPost = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to post!");
      return;
    }
  
    const author = user.displayName || "Anonymous";
    const content = document.getElementById('post-content').value;
  
    if (content.trim() === "") {
      alert("Post content cannot be empty!");
      return;
    }
  
    await addDoc(collection(db, 'test'), { author, content });
    document.getElementById('post-form').reset();
  };
  
  // Initialize the app
  window.onload = () => {
    initializePostListener();
    console.log("Script Activated")
  };
  window.addPost = addPost;
