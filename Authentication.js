import { Alert } from "react-native";
import firebase from "./FirebaseConfig";

firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log(user + " has been authenticated");
  }
});

export async function signInWithEmail() {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, pasword)
    .catch(function (error) {
      console.log(
        error + ": An occured when signing in with email and password"
      );
    })
    .then(() => {
      console.log("login successful with email and password!");
    });
}

export async function signOut() {
  await firebase
    .auth()
    .signOut()
    .then(function () {
      Alert.alert("You have been signed out successfully!");
      console.log("You have been signed out successfully!");
    })
    .catch(function (error) {
      console.log(error + ": An error occured when signing out");
    });
}
