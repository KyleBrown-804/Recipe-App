import { StatusBar } from "expo-status-bar";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./Styles/defaultStyle";

// Navigators
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import HomeScreen from "./Home";
import RecipeScreen from "./RecipeScreen";
import SettingsScreen from "./Settings";
import AddRecipeScreen from "./AddRecipeScreen";
import LoginScreen from "./Auth/LoginScreen";

const Drawer = createDrawerNavigator();
const Tabs = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="LoggedIn"
      >
        <Stack.Screen name="LoggedIn" component={AppNavigator} />
        <Stack.Screen name="LoggedOut" component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthNavigator({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

// Drawer Navigator has to be exported as parent to be seen
function AppNavigator({ navigation }) {
  return (
    <Drawer.Navigator hideStatusBar="true">
      <Drawer.Screen
        name="HomeScreen"
        component={HomeStackNavigator}
        options={{
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen name="Settings" component={SettingsStackNavigator} />
    </Drawer.Navigator>
  );
}

// Stack Navigators are used solely to implement the header bar and menu button
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#89e8e8",
        },
        headerLeft: () => (
          <MaterialCommunityIcons.Button
            name="menu"
            size={32}
            color="white"
            backgroundColor="#89e8e8"
            onPress={() => navigation.toggleDrawer()}
          ></MaterialCommunityIcons.Button>
        ),
      })}
    >
      <Stack.Screen
        name="Home"
        component={MyMaterialBottomTabNavigator}
        options={{
          title: null,
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#89e8e8",
        },
        headerLeft: () => (
          <MaterialCommunityIcons.Button
            name="menu"
            size={32}
            color="white"
            backgroundColor="#89e8e8"
            onPress={() => navigation.toggleDrawer()}
          ></MaterialCommunityIcons.Button>
        ),
      })}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: null,
        }}
      />
    </Stack.Navigator>
  );
}

// Tab Navigation for logged in state on home page
function MyMaterialBottomTabNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="black"
      barStyle={{ backgroundColor: "#89e8e8" }}
    >
      <Tabs.Screen
        name="My Feed"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Add Recipe"
        component={AddRecipeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="playlist-edit"
              size={24}
              color={color}
            />
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
}

export default MainNavigator;
