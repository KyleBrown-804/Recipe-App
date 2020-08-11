import React, { Component, useState, useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  SafeAreaView,
} from "react-native";

export default function AuthLoadingScreen({navigation}) {
  // constructor() {
  //   super();
  //   this.state= {
  //     isLoading: true,
  //   }
  //   this.fetchToken();
  // }

  // componentDidUpdate() {
  //   this.fetchToken();
  // }

  // async function fetchToken() {
  //   console.log("retrieving async storage auth_token");
  //   let auth_token = await AsyncStorage.getItem("auth_token");

  //   if (auth_token == "LoggedIn") {
  //     console.log("auth_token: LoggedIn");
  //     this.props.navigation.navigate("LoggedIn");
  //   } else {
  //     console.log("auth_token: ", auth_token);
  //     this.props.navigation.navigate("LoggedOut");
  //   }
  // }

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(async () => {
      console.log("retrieving async storage auth_token");
      let auth_token = await AsyncStorage.getItem("auth_token");

      if (auth_token == "LoggedIn") {
        console.log("auth_token: LoggedIn");
        navigation.navigate("LoggedIn");
      } else {
        console.log("auth_token: ", auth_token);
        navigation.navigate("LoggedOut");
      }

      setLoading(false);
    }, 2000);
  }, []);

    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </SafeAreaView>
    );
}
