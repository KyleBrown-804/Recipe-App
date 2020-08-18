import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const majorColor = "#89e8e8";
const minorColor = "#fa7369";
const minorOther = "#f79b94";

// color harmonies relative to majorColor #89e8e8
// https://www.sessions.edu/color-calculator/
const complementary = "#e8a189";
const monochromatic = "#51cfcf";
const analogous1 = "#8989e8";
const analogous2 = "#89e889";
const splitComp1 = "#e8b989";
const splitComp2 = "#e88989";
const triadic1 = "#e8d089";
const triadic2 = "#e889b9";
const tetradic1 = "#e8a189";
const tetradic2 = "#e8d089";
const tetradic3 = "#b989e8";

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
    backgroundColor: monochromatic,
  },
  cardText: {
    fontSize: 16,
    padding: 10,
    backgroundColor: complementary,
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
    fontSize: 18,
    alignSelf: "center",
  },
  settingsOption: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: "90%",
    height: 40,
    justifyContent: "center",
  },
  settingsIcon: {
  },
  settingsHeader: {
    fontSize: 20,
    color: "gray",
    textAlign: "left",
    padding: 10,
  },
});
