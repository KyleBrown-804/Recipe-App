import firebase from "../../FirebaseConfig";
import { db } from "./FireDBConfig";

export async function addRecipe(Recipe) {
  if (Recipe != null || Recipe != undefined) {
    console.log("adding Recipe...");
    console.log(Recipe);
  } else {
    console.log("Error: Recipe returned null or undefined");
  }
}
