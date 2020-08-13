import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./Styles/defaultStyle";
import { AuthContext, signInWithEmail, signOut } from "./Auth/Authentication";

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
import LoadingScreen from "./Auth/LoadingScreen";

const Drawer = createDrawerNavigator();
const Tabs = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MainNavigator({ navigation }) {

  const [loginState, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RETRIEVE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "LOGIN":
          return {
            ...prevState,
            email: action.id,
            userToken: action.token,
            isLoading: false,
          };
        case "LOGOUT":
          return {
            ...prevState,
            email: null,
            userToken: null,
            isLoading: false,
          };
        case "REGISTER":
          return {
            ...prevState,
            email: action.id,
            userToken: action.token,
            isLoading: false,
          };
      }
    },
    {
    isLoading: true,
    email: null,
    userToken: null,
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: (email, password) => {
        // this is where you would make a firebase signInWithEmail call,
        // the problem is though it automatically dispatches even if authentication fails

        let userToken = null;
        if (email == "user" && password == "pass") {
          userToken = "randomToken";
        }
        dispatch({ type: "LOGIN", id: email, token: userToken });
      },
      signOut: () => {
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {},
    }),
    []
  );

  // figure out issue with sign out then re-open app coming in as logged in

  useEffect(() => {
    setTimeout(() => {
      let userToken;
      userToken = "af3wtg342";
      console.log("user token: ", userToken);
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 2000);
  }, []);

  if (loginState.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {loginState.userToken != null ? (
            <Stack.Screen name="LoggedIn" component={AppNavigator} />
          ) : (
            <Stack.Screen name="LoggedOut" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
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
