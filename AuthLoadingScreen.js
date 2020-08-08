import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar } from "react-native";

export async function fetchToken() {
  const auth_token = await AsyncStorage.getItem("auth_token");


  if (auth_token === "LoggedIn") {
    console.log("auth_token: LoggedIn");
    return true;
  } else {
    console.log("auth_token: LoggedOut");
    return false;
  }
}
