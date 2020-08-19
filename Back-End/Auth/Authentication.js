import { Alert, AsyncStorage } from "react-native";
import firebase from "../../FirebaseConfig";

export async function createUserWithEmail(email, password) {
  let isSuccess = false;

  console.log("attempting to create new user with email and password...");
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async () => {
      await AsyncStorage.setItem("auth_token", "LoggedIn");
      console.log("create account successful with email and password!");
      isSuccess = true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/email-already-in-use") {
        alert("Email is already in use!");
        console.log(errorMessage);
      } else if (errorCode == "auth/invalid-email") {
        alert("The email entered is invalid!");
        console.log(errorMessage);
      } else if (errorCode == "auth/weak-password") {
        alert("The password entered is too weak, please try another!");
        console.log(errorMessage);
      } else {
        console.log(errorMessage);
      }
    });
    return isSuccess;
}

export async function signInWithEmail(email, password) {
  let isSuccess = false;

  console.log("attempting to sign in with email and password...");
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async () => {
      await AsyncStorage.setItem("auth_token", "LoggedIn");
      console.log("login successful with email and password!");
      isSuccess = true;
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/invalid-email") {
        alert("The email address entered was invalid.");
        console.log(errorMessage);
      } else if (errorCode == "auth/user-disabled") {
        alert("The account or email associated has been disabled.");
        console.log(errorMessage);
      } else if (errorCode == "auth/user-not-found") {
        alert("There is no user associated with the entered email.");
        console.log(errorMessage);
      } else if (errorCode == "auth/wrong-password") {
        alert("The password entered was incorrect.");
        console.log(errorMessage);
      } else {
        console.log(errorMessage);
      }
    });
  return isSuccess;
}

export async function signOut() {
  await firebase
    .auth()
    .signOut()
    .then(async () => {
      await AsyncStorage.removeItem("auth_token");
      console.log("You have been signed out successfully!");
    })
    .catch(function (error) {
      Alert.alert(error + ": An error occured when signing out");
      console.log(error + ": An error occured when signing out");
    });
}
