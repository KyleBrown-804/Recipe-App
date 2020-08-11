import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { styles } from "./Styles/defaultStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signOut } from "./Auth/Authentication";

export default function SettingsScreen({navigation}) {
  async function onSignOutPress(){
    console.log("onSignOutPress activated");
    signOut().then(() => {
      navigation.navigate("LoggedOut");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.settingsOption}>
        <Text style={styles.settingsText}>
          <MaterialCommunityIcons
            style={styles.settingsIcon}
            name="menu"
            size={20}
            color="black"
            backgroundColor="#89e8e8"
          ></MaterialCommunityIcons>
          Profile Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsOption}>
        <Text style={styles.settingsText}>Recipe View Style</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsOption}>
        <Text style={styles.settingsText}>Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsOption}
        onPress={() => {
          onSignOutPress();
        }}
      >
        <Text style={styles.settingsText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
