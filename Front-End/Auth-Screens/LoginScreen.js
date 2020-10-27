import React, { useState } from "react";
import { styles } from "../../Styles/defaultStyle";
import {
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { signInWithEmail } from "../../Back-End/Auth/Authentication";

// Plans to make rotating stock images
const images = [
  "https://rb.gy/rngjtp",
  "https://rb.gy/jxgjjt",
  "https://rb.gy/cuuz64",
  "https://rb.gy/xdvkqn",
  "https://rb.gy/fbiem8",
  "https://rb.gy/7zcrsx",
  "https://rb.gy/ry2wkc",
];

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
    <KeyboardAvoidingView style={{flex:1}}>
      <View style={{flex:1, backgroundColor: 'white', justifyContent:'flex-end'}}>
      
      <View style={{...StyleSheet.absoluteFill}}>
        <Image
          source={require("../../assets/login.png")}
          style={{height: '100%', width: '100%', resizeMode: "cover"}}/>
      </View>

      <View style={styles.authScreenContainer}>
          <TextInput style={styles.authScreenField}
            placeholder="Email or Username"
            placeholderTextColor="white"
            onChangeText={(input) => setEmail(input)}
          ></TextInput>
          <TextInput style={styles.authScreenField}
            placeholder="Password"
            placeholderTextColor="white"
            onChangeText={(input) => setPass(input)}
          ></TextInput>

          <View style={styles.authButtonContainer}>
          <TouchableOpacity style={styles.authButton} onPress={() => onLoginPress()}>
            <Text style={{color: "white"}}>Sign In!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate("SignUpScreen")}>
            <Text style={{color: "white"}}>Sign Up!</Text>
          </TouchableOpacity>
          </View>

        </View>

    </View>
    </KeyboardAvoidingView>
  );
}
