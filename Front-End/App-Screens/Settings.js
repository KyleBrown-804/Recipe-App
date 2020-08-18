import React from "react";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import { styles } from "../../Styles/defaultStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signOut } from "../../Back-End/Auth/Authentication";

export default function SettingsScreen({ navigation }) {
  async function onLogoutPress() {
    console.log("sign out pressed");
    signOut()
      .then(() => {
        navigation.navigate("Loading");
      })
      .catch((err) => console.log(err));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.settingsHeader}>General</Text>
      <TouchableOpacity style={styles.settingsOption}>
        <MaterialCommunityIcons
          style={styles.settingsIcon}
          name="menu"
          size={20}
          color="black"
          backgroundColor="#89e8e8"
        ></MaterialCommunityIcons>
        <Text style={styles.settingsText}>Profile Settings</Text>
      </TouchableOpacity>
      <Text style={styles.settingsHeader}>Aesthetics</Text>
      <TouchableOpacity style={styles.settingsOption}>
        <Text style={styles.settingsText}>Recipe View Style</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsOption}>
        <Text style={styles.settingsText}>Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsOption}
        onPress={() => {
          onLogoutPress();
        }}
      >
        <Text style={styles.settingsText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
