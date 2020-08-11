import React from "react";
import { SafeAreaView } from "react-native";
import MainNavigator from "./Navigation";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainNavigator />
    </SafeAreaView>
  );
}
