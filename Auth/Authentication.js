import React from "react";
import { Alert, AsyncStorage } from "react-native";
import firebase from "../FirebaseConfig";

export const AuthContext = React.createContext();

export async function checkUserAuth() {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user + " has been authenticated");
    } else {
      console.log("user not authenticated");
    }
  });
}

export async function signInWithEmail(email, password) {
  console.log("attempting to sign in with email and password");

  const userToken = null;

  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async () => {
      await AsyncStorage.setItem("auth_token", "LoggedIn");
      console.log("login successful with email and password!");
      userToken = "blah blah blah";
      return userToken;
    })
    .catch(function (error) {
      Alert.alert("Invalid email or password!");
      console.log(
        error + ": An occured when signing in with email and password"
      );
    });
    return userToken;
}

export async function signOut() {
  await firebase
    .auth()
    .signOut()
    .then(async () => {
      await AsyncStorage.removeItem("auth_token");
      // Alert.alert("You have been signed out successfully!");
      console.log("You have been signed out successfully!");
    })
    .catch(function (error) {
      Alert.alert(error + ": An error occured when signing out");
      console.log(error + ": An error occured when signing out");
    });
}
