import React from "react";
import { Text, SafeAreaView, Button, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../Styles/defaultStyle";
import firebase from "../../FirebaseConfig";

// expo
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default class AddRecipeScreen extends React.Component {
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
        this.uploadImage(result.uri, "test-image")
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
        this.uploadImage(result.uri, "test-image")
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

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return ref.put(blob);
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
