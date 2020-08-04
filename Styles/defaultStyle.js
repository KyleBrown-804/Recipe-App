import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const majorColor = "#89e8e8";
const minorColor = "#fa7369";
const minorOther = "#f79b94";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
    justifyContent: "center",
  },

  // Recipes.js ---------------------------------------
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: minorOther,
    fontSize: 24,
    marginHorizontal: 10,
  },

  recipesContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  cardText: {
    fontSize: 16,
    padding: 10,
    backgroundColor: minorOther,
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: "2%",
    width: "96%",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  //   SettingScreen.js
  settingsText: {
    fontSize: 16,
    alignSelf: "center"
  },
  settingsOption: {
      marginBottom: 10,
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: minorOther,
      width: "96%",
      height: 40
  },
  settingsIcon: {
  }

});
