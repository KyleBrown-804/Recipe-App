import React from "react";
import { styles } from "../Styles/defaultStyle";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  AsyncStorage,
} from "react-native";
import { signInWithEmail } from "../Authentication";

export default function LoginScreen() {
  state = {
    email: "",
    password: "",
  };

  async function onLoginPress() {
    console.log("onLoginPress activated");
    signInWithEmail("please@email.com", "dev1234!").catch(error => {
      console.log(error + ": Error attempting to sign in")
    });
    navigation.push("LoggedIn");
    console.log("loggin pushed");
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
