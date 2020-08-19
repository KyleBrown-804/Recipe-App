import React from "react";
import { SafeAreaView, YellowBox } from "react-native";
import MainNavigator from "./Navigation";

YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainNavigator />
    </SafeAreaView>
  );
}
