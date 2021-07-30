import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBgcR9Q12H6gwADriLsIAY7aERUYHWHkyU",
  authDomain: "pet-house-management.firebaseapp.com",
  projectId: "pet-house-management",
  storageBucket: "pet-house-management.appspot.com",
  messagingSenderId: "1014585467876",
  appId: "1:1014585467876:web:3138df194475ccb9a95df1",
  measurementId: "G-91DTD7Y6QP",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
