import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsi7Pi-Q-tNlTyRqQD1r3PWxIaibFGz6k",
  authDomain: "phm-cms.firebaseapp.com",
  projectId: "phm-cms",
  storageBucket: "phm-cms.appspot.com",
  messagingSenderId: "600076669446",
  appId: "1:600076669446:web:d9f0fbe7735d19a2eee987",
  measurementId: "G-2XZEKRVLLP",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore();

if (window.location.hostname === "localhost") {
  firestore.useEmulator("localhost", 3088);
}

export { storage, firestore, firebase as default };
