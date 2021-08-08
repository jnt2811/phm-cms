import firebase from "firebase/app";
import "firebase/storage";

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

export { storage, firebase as default };
