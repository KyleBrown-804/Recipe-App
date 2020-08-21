import firebase from "../../FirebaseConfig";
import { db } from "./FireDBConfig";
import { getUserID } from "./User";

export async function addRecipe(Recipe) {
  if (Recipe != null || Recipe != undefined) {
    console.log("adding Recipe...");

    db.collection("Recipes")
      .doc()
      .set(Recipe)
      .then(() => {
        console.log("Recipe added to the database!");
      })
      .catch((error) => {
        console.log("Error occured trying to add recipe to the db: " + error);
      });
  } else {
    console.log("Error: Recipe returned null or undefined");
  }
}
