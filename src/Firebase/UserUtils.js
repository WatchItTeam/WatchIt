import firebase from "./firebase";

export function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function signIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function resetPassword(emailAddress) {
  return firebase.auth().sendPasswordResetEmail(emailAddress);
}

export function signOut() {
  return firebase.auth().signOut();
}
