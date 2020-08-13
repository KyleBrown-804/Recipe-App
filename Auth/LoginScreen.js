import React from "react";
import { styles } from "../Styles/defaultStyle";
import { SafeAreaView, TouchableOpacity, Text, TextInput } from "react-native";
import { signInWithEmail } from "./Authentication";

export default function LoginScreen({ navigation }) {
  async function onLoginPress(email, password) {
    console.log("sign in pressed");
    signInWithEmail(email, password)
      .then(() => {
        navigation.navigate("Loading");
      })
      .catch((err) => console.log(err));
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput placeholder="Email or Username"></TextInput>
      <TextInput placeholder="Password"></TextInput>
      <TouchableOpacity
        onPress={() => {
          onLoginPress("please@email.com", "dev1234!");
        }}
      >
        <Text>Sign In!</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sign Up!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
