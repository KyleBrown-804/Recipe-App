import React, { useState } from "react";
import { styles } from "../../Styles/defaultStyle";
import { SafeAreaView, TouchableOpacity, Text, TextInput } from "react-native";
import { createUserWithEmail } from "../../Back-End/Auth/Authentication";
import { newUser } from "../../Back-End/Database/User";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [name, setName] = useState("");

  async function onSignUpPress() {
    await createUserWithEmail(email, password)
      .then((onSuccess) => {
        if (onSuccess) {
          console.log("onSuccess: ", onSuccess);
          // call database newUser
          newUser(name);
          navigation.navigate("Loading");
        } else {
          console.log("Failed To Create User With Email");
        }
      })
      .catch((err) => console.log(err));
  }

  // update visuals later
  return (
    <SafeAreaView
      style={{
        backgroundColor: "gray",
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="Please Enter Your Name"
        onChangeText={(input) => setName(input)}
      ></TextInput>
      <TextInput
        placeholder="Please Enter Your Email"
        onChangeText={(input) => setEmail(input)}
      ></TextInput>
      <TextInput
        placeholder="Password"
        onChangeText={(input) => setPass(input)}
      ></TextInput>
      <TouchableOpacity onPress={() => onSignUpPress()}>
        <Text>Sign Me Up!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text>Take Me Back To Login!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
