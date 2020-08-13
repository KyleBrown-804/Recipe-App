import React from "react";
import { ActivityIndicator, StatusBar, SafeAreaView } from "react-native";

export default function LoadingScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" />
      <StatusBar barStyle="default" />
    </SafeAreaView>
  );
}
