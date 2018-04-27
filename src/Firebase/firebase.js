import * as firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDi5flNMddcTwDvPHGO4VILNUJ02RiLjd0",
  authDomain: "watchit-cbe87.firebaseapp.com",
  databaseURL: "https://watchit-cbe87.firebaseio.com",
  projectId: "watchit-cbe87",
  storageBucket: "",
  messagingSenderId: "618753430688"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
export const database = firebaseApp.database();
