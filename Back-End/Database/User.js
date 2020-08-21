import React from "react";
import firebase from "../../FirebaseConfig";
import { db } from "./FireDBConfig";

export async function getUserID() {
  let UID = await firebase.auth().currentUser.uid;
  if(UID != null) {
    return UID;
  }
  else {
    console.log("Couldn't retrieve current user uid.");
  }
}

export async function newUser(name) {
  const userEmail = firebase.auth().currentUser.email;
  const UID = await getUserID();
  db.collection("Users")
    .doc(UID)
    .set({
      Age: 0,
      ID: UID,
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
