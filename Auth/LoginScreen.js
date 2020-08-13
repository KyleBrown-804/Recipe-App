import React from "react";
import { styles } from "../Styles/defaultStyle";
import { SafeAreaView, TouchableOpacity, Text, TextInput } from "react-native";
import { AuthContext } from "./Authentication";

export default function LoginScreen() {
  const { signIn } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput placeholder="Email or Username"></TextInput>
      <TextInput placeholder="Password"></TextInput>
      <TouchableOpacity
        onPress={() => {
          console.log("sign in pressed");
          signIn("user", "pass");
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
