import React from "react";
import {
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import firebase from "../FirebaseConfig";
import { useIsFocused } from "@react-navigation/native";

export default function LoadingScreen({ navigation }) {
  const isFocused = useIsFocused();

  if (isFocused) {
    setTimeout(() => checkUserAuth(), 2000);
  }

  async function checkUserAuth() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log("user has been authenticated");
        navigation.navigate("LoggedIn");
      } else {
        console.log("user not authenticated");
        navigation.navigate("LoggedOut");
      }
    });
  }

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" />
      <StatusBar barStyle="default" />
    </SafeAreaView>
  );
}
