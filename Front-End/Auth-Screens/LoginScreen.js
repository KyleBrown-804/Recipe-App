import React, { useState } from "react";
import { styles } from "../../Styles/defaultStyle";
import { SafeAreaView, TouchableOpacity, Text, TextInput } from "react-native";
import { signInWithEmail } from "../../Back-End/Auth/Authentication";

export default function LoginScreen({ navigation }) {
  // hardcoded state for testing
  const [email, setEmail] = useState("Test@email.com");
  const [password, setPass] = useState("Dev1234!");

  async function onLoginPress() {
    await signInWithEmail(email, password)
      .then((onSuccess) => {
        if (onSuccess) {
          navigation.navigate("Loading");
        } else {
          console.log("Failed To Sign In With Email and Password");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Email or Username"
        // onChangeText={(input) => setEmail(input)}
      ></TextInput>
      <TextInput
        placeholder="Password"
        // onChangeText={(input) => setPass(input)}
      ></TextInput>
      <TouchableOpacity onPress={() => onLoginPress()}>
        <Text>Sign In!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
        <Text>Sign Up!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
