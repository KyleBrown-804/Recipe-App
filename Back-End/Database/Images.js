import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Alert } from "react-native";

import { storage } from "./FireDBConfig";
import { getUserID } from "./User";
import { addRecipe } from "./RecipeQueries";

export async function chooseImage(Recipe) {
  console.log("Choose image pressed...");
  try {
    const UID = await getUserID();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      await uploadImage(result.uri, UID, Recipe)
        .then(() => {
          Alert.alert("Image successfully uploaded!");
          console.log("Image successfully uploaded!");
        })
        .catch((error) => Alert.alert(error));
    }
    console.log("cancelled?: " + result.cancelled);
  } catch (error) {
    console.log(error);
  }
}

export async function takePhoto(Recipe) {
  console.log("Take photo pressed...");
  try {
    const UID = await getUserID();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      await uploadImage(result.uri, UID, Recipe)
        .then(() => {
          Alert.alert("Image successfully uploaded!");
          console.log("Image successfully uploaded!");
        })
        .catch((error) => Alert.alert(error));
    }
    console.log("cancelled?: " + result.cancelled);
  } catch (error) {
    console.log(error);
  }
}

async function uploadImage(uri, userID, Recipe) {
  console.log("Uploading image...");
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = storage.ref().child("images/");
  const time = new Date().getTime();
  const uploadTask = ref.child(userID + "/" + time + "-" + Recipe.name);

  await uploadTask
    .put(blob)
    .then(async () => {
      console.log("blob added...");
      await uploadTask
        .getDownloadURL()
        .then(async (url) => {
          console.log("got download URL...");
          Recipe.imageURL = url;
          await addRecipe(Recipe);
        })
        .catch((error) =>
          console.log("Error retrieving downloadURL: " + error)
        );
    })
    .catch((error) => {
      console.log("Error occured trying to upload image: " + error);
    });
}
