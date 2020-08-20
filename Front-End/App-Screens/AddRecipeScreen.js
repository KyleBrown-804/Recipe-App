import React from "react";
import { Text, SafeAreaView, Button, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../Styles/defaultStyle";
import { storage } from "../../Back-End/Database/FireDBConfig";
import { UID } from "../../Back-End/Database/User";
import { addRecipe } from "../../Back-End/Database/RecipeQueries";

// expo
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default class AddRecipeScreen extends React.Component {
  Recipe = {
    name: "",
    calories: 0,
    description: "",
    ingredients: [],
    imageUrl: "",
  }
  
  onChooseImagePress = async () => {
    console.log("Choose image pressed...");
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        this.uploadImage(result.uri, UID, "camera-roll-image")
          .then(() => {
            Alert.alert("Image successfully uploaded!");
            console.log("Image successfully uploaded!");
          })
          .catch((error) => Alert.alert(error));
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  onTakePhotoPress = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        this.uploadImage(result.uri, UID, "camera-image")
          .then(() => {
            Alert.alert("Image successfully uploaded!");
            console.log("Image successfully uploaded!");
          })
          .catch((error) => Alert.alert(error));
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  uploadImage = async (uri, userID, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = storage.ref().child("images/");
    const userRef = ref.child(userID + "/" + imageName);
    userRef.put(blob);
    userRef
      .getDownloadURL()
      .then((url) => {
        console.log("image url: " + url);
        this.Recipe.imageUrl = url
        addRecipe(this.Recipe);
      })
      .catch((error) => console.log(error));
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
