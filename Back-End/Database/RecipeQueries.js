import firebase from "../../FirebaseConfig";
import { db } from "./FireDBConfig";
import { getUserID } from "./User";

export async function addRecipe(Recipe) {
  const userID = await getUserID();

  if (Recipe != null || Recipe != undefined) {
    console.log("adding Recipe...");
    const newDocRef = await db
      .collection("Recipes")
      .doc(userID)
      .collection("User-Recipes")
      .doc();
    Recipe.recipeID = newDocRef.id;

    await newDocRef
      .set(Recipe)
      .then(() => {
        console.log("Recipe added to the database!");
      })
      .catch(() => {
        console.log("Error occured trying to add recipe to the db: " + error);
      });
  } else {
    console.log("Error: Recipe returned null or undefined");
  }
}

//  test this out and see if it actually returns recipe objects
export async function getAllRecipes() {
  console.log("grabbing all recipes...");
  let userRecipes = [];
  const userID = await getUserID();

  await db
    .collection("Recipes")
    .doc(userID)
    .collection("User-Recipes")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          console.log("doc.id: " + doc.id);
          userRecipes.push(doc.data());
        } else {
          console.log("No document found in querySnapshot");
        }
      });
    })
    .catch((error) => {
      console.log("Error retrieving recipes from user: " + error);
    });
  console.log("recipes retrieved");
  return userRecipes;
}
