import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./Home";
import RecipeScreen from "./Recipes";

const Tabs = createMaterialBottomTabNavigator();

const TabNavigator = function MaterialBottomTabs() {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeScreen} />
        <Tabs.Screen name="My Recipes" component={RecipeScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigator;