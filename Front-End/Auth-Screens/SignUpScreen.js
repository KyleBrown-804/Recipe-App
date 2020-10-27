import React, { useState } from "react";
import { styles } from "../../Styles/defaultStyle";
import { KeyboardAvoidingView, View, StyleSheet, Image, TouchableOpacity, Text, TextInput } from "react-native";
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
          newUser(name);
          navigation.navigate("Loading");
        } else {
          console.log("Failed To Create User With Email");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={{flex:1, backgroundColor: 'white', justifyContent:'flex-end'}}>

      <View style={{...StyleSheet.absoluteFill}}>
        <Image
          source={require("../../assets/signUp.jpg")}
          style={{height: '100%', width: '100%', resizeMode: "cover"}}/>
      </View>

      <View style={styles.authScreenContainer}>
        <TextInput style={styles.authScreenField}
          placeholder="Please Enter Your Name"
          placeholderTextColor="white"
          onChangeText={(input) => setName(input)}
        ></TextInput>
        <TextInput style={styles.authScreenField}
          placeholder="Please Enter Your Email"
          placeholderTextColor="white"
          onChangeText={(input) => setEmail(input)}
        ></TextInput>
        <TextInput style={styles.authScreenField}
          placeholder="Password"
          placeholderTextColor="white"
          onChangeText={(input) => setPass(input)}
        ></TextInput>

        <View style={styles.authButtonContainer}>
          <TouchableOpacity style={styles.authButton} onPress={() => onSignUpPress()}>
            <Text style={{color: "white"}}>Sign Me Up!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton} onPress={() => navigation.pop()}>
            <Text style={{color: "white"}}>Back To Login!</Text>
          </TouchableOpacity>
        </View>
      </View>

      </View>
    </KeyboardAvoidingView>
  );
}
