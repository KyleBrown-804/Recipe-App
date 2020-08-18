import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { render } from "react-dom";

export default class AddRecipeScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Add Recipe</Text>
      </View>
    );
  }
}
