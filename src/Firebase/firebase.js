import * as firebase from "firebase";
import "firebase/firestore";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDi5flNMddcTwDvPHGO4VILNUJ02RiLjd0",
  authDomain: "watchit-cbe87.firebaseapp.com",
  databaseURL: "https://watchit-cbe87.firebaseio.com",
  projectId: "watchit-cbe87",
  storageBucket: "",
  messagingSenderId: "618753430688",
};
const firebaseApp = firebase.initializeApp(config);

// Initialize the Firestore database
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true, // firebase prints an error in the console without this
});

export { db };
export default firebaseApp;
