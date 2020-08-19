import React from "react";
import firebase from "../../FirebaseConfig";
import db from "./FireStoreConfig";

export function newUser(name) {
  const userID = firebase.auth().currentUser.uid;
  const userEmail = firebase.auth().currentUser.email;

  db.collection("Users")
    .doc(userID)
    .set({
      Age: 0,
      ID: userID,
      Name: name,
      email: userEmail,
    })
    .then(() => {
      console.log("User: ", name, " added to the database!");
    })
    .catch((error) => {
      console.error("Error adding user: ", error);
    });
}
