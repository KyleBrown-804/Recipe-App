import React from "react";
import { Text, SafeAreaView, Button, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../Styles/defaultStyle";
import { storage } from "../../Back-End/Database/FireDBConfig";
import { getUserID } from "../../Back-End/Database/User";
import { addRecipe } from "../../Back-End/Database/RecipeQueries";

// expo
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default class AddRecipeScreen extends React.Component {
  Recipe = {
    name: "Spaghetti & Meatballs",
    calories: 780,
    description: "Classic spaghetti and meatballs with marina sauce!",
    ingredients: [
      "Spaghetti noodles",
      "Meatballs",
      "Marinara Sauce",
      "Parmasean cheese",
    ],
    imageUrl: "",
    associatedUserId: "",
  };

  onChooseImagePress = async () => {
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
        await this.uploadImage(result.uri, UID, "camera-roll-image")
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
  };

  onTakePhotoPress = async () => {
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
        await this.uploadImage(result.uri, UID, "camera-image")
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
  };

  uploadImage = async (uri, userID, imageName) => {
    console.log("Uploading image...");
    this.Recipe.associatedUserId = userID;
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage.ref().child("images/");
    const time = new Date().getTime();
    const uploadTask = ref.child(userID + "/" + time + "-" + imageName);

    await uploadTask
      .put(blob)
      .then(async () => {
        console.log("blob added...");
        await uploadTask
          .getDownloadURL()
          .then(async (url) => {
            console.log("got download URL...");
            this.Recipe.imageUrl = url;
            await addRecipe(this.Recipe);
          })
          .catch((error) =>
            console.log("Error retrieving downloadURL: " + error)
          );
      })
      .catch((error) => {
        console.log("Error occured trying to upload image: " + error);
      });
  };
  getPermissionAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            style={{ padding: 20 }}
            name="camera"
            size={100}
            color="black"
            backgroundColor="#89e8e8"
            onPress={() => this.onTakePhotoPress()}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
        <MaterialCommunityIcons
          style={{ padding: 20 }}
          name="folder-image"
          size={100}
          color="black"
          backgroundColor="#89e8e8"
          onPress={() => this.onChooseImagePress()}
        ></MaterialCommunityIcons>
      </SafeAreaView>
    );
  }
}
