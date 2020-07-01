import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Navigators
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import HomeScreen from "./Home";
import RecipeScreen from "./Recipes";
import SettingsScreen from "./Settings";

const Drawer = createDrawerNavigator();
const Tabs = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const MainNavigator = function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#55ceff",
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={MyDrawerNavigator}
          options={{
            title: null,
            headerLeft: () => (
              <MaterialCommunityIcons.Button
                name="menu"
                size={32}
                color="white"
                backgroundColor="#55ceff"
                // onPress={() => navigation.openDrawer()}
              ></MaterialCommunityIcons.Button>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const MyDrawerNavigator = function DrawerNavigatior() {
  return (
    <Drawer.Navigator hideStatusBar="true">
      <Drawer.Screen
        name="HomeScreen"
        component={MyMaterialBottomTabNavigator}
        options={{
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

const MyMaterialBottomTabNavigator = function MaterialBottomTabNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="black"
      barStyle={{ backgroundColor: "#55ceff" }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="My Recipes"
        component={RecipeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pot-mix" size={24} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainNavigator;
