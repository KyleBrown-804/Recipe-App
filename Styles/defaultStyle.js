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
  // Settings.js ---------------------------------------
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
  settingsHeader: {
    fontSize: 20,
    color: "gray",
    textAlign: "left",
    padding: 10,
  },

  // AddRecipeScreen.js ---------------------------------------
  formHeader: {
    fontSize: 24,
    color: "gray",
    textAlign: "center",
    padding: 10,
  },
  formName: {
    flex: 1,
    fontSize: 22,
    textAlign: "left",
    paddingLeft: 8,
    paddingBottom: 5,
  },
  cameraIcons: {
    paddingHorizontal: 50,
    paddingTop: 10,
    paddingBottom: 10,
  },
  submitButton: {
    width: 150,
    height: 50,
    alignContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    backgroundColor: "lightgray",
    textAlign: "center",
    marginBottom: 20,
  },
  // form items -------------------------
  formSection: {
    padding: 5,
    paddingBottom: 10,
    marginBottom: 10,
  },
  formItem: {
    maxWidth: "95%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  formItemRow: {
    width: "95%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  formItemColumn: {
    width: "95%",
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "space-between",
  },

  // text inputs -------------------------
  smallTextInput: {
    flex: 1,
    fontSize: 18,
    alignSelf: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
  textInput: {
    width: "auto",
    flex: 3,
    fontSize: 18,
    alignSelf: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
  largeInput: {
    flex: 1,
    width: "95%",
    fontSize: 18,
    alignSelf: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
});
