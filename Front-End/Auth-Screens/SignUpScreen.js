import React from "react";
import { styles } from "../../Styles/defaultStyle";
import { SafeAreaView, TouchableOpacity, Text, TextInput } from "react-native";

export default function SignUpScreen({ navigation }) {
  async function onSignUpPress() {}

  return (
    <SafeAreaView style={styles.container}>
      <TextInput placeholder="Email or Username"></TextInput>
      <TextInput placeholder="Password"></TextInput>
      <TouchableOpacity onPress={() => onSignUpPress()}>
        <Text>Sign In!</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sign Up!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
