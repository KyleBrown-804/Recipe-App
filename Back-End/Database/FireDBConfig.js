import firebase from "../../FirebaseConfig";
import firestore from "firebase/firestore";

export const storage = firebase.storage();
export const db = firebase.firestore();
