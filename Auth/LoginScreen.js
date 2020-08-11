import React, { Component, useContext } from "react";
import { styles } from "../Styles/defaultStyle";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  AsyncStorage,
} from "react-native";
import { signInWithEmail } from "./Authentication";

export default function LoginScreen({ navigation }) {
  async function onLoginPress() {
    console.log("onLoginPress activated");
    signInWithEmail("please@email.com", "dev1234!").catch((error) => {
      console.log(error + ": Error attempting to sign in");
    });
    navigation.navigate("LoggedIn");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput placeholder="Email or Username"></TextInput>
      <TextInput placeholder="Password"></TextInput>
      <TouchableOpacity onPress={() => onLoginPress()}>
        <Text>Sign In!</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sign Up!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
