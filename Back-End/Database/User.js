import React, { useState } from "react";
import firebase from "../../FirebaseConfig";
import db from "./Config";

export default function User() {
  const [UID, setUID] = useState(null);

  async function getUID() {
    await firebase
      .auth()
      .currentUser.uid.then((id) => {
        setUID(id);
        console.log("UID: ", UID);
      })
      .catch((err) => console.log(err));
  }
}

// Update values to correspond to sign up procedure
export default function newUser() {
  try {
    getUID();
  } catch (error) {
    console.log("failed to get UID: ", error);
  }

  db.collection("Users")
    .add({
      Age: 0,
      ID: UID,
      Name: "",
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
