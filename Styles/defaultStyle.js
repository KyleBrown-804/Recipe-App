import { StyleSheet, Dimensions } from "react-native";
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

const { width, height } = Dimensions.get("window");
const MODAL_HEIGHT = height / 3;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
    justifyContent: "center",
  },

  // SignUpScreen.js =======================================

  // LoginScreen.js ========================================
  authScreenContainer: {
    alignItems: "center",
    justifyContent: "center", 
  },
  authScreenField: {
    alignContent:"center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: 'rgba(145, 145, 145, .6)',
    margin: 10,
    height: 50,
    width: "75%",
  },
  authButtonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  authButton: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: 'rgba(145, 145, 145, .6)',
    height: 50,
    justifyContent: "center",
    width: "20%",
    margin: 10,
  },

  // Recipes.js ============================================
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
  // Settings.js ==============================================
  settingsText: {
    fontSize: 18,
    alignSelf: "center",
  },
  settingsOption: {
    marginBottom: 10,
    width: "75%",
    height: 40,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  settingsHeader: {
    fontSize: 30,
    color: "gray",
    alignSelf: "center",
    padding: 10,
    margin: 10,
  },

  // AddRecipeScreen.js ================================================
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
  imagePreview: {
    backgroundColor: "gray",
    alignContent: "center",
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: 300,
    height: MODAL_HEIGHT,
  },
  modalButton: {
    flex: 1,
    height: 50,
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    backgroundColor: "lightgray",
    paddingHorizontal: 15,
    marginTop: 25,
    marginHorizontal: 15,
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
    marginBottom: 10,
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
    width: "100%",
    height: 40,
    fontSize: 18,
    alignSelf: "center",
    paddingHorizontal: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
  textInput: {
    width: "auto",
    height: 40,
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
    textAlign: "left",
    paddingLeft: 5,
  },
  //  ingredient fields -----------------------------
  inputsContainer: {
    flexDirection: "row",
    padding: 10,
  },
  largeInputContainer: {
    width: "40%",
    flex: 4,
    marginRight: 5,
  },
  inputContainer: {
    width: "40%",
    flex: 2,
    marginRight: 5,
  },
  ingredientField: {
    paddingHorizontal: 15,
    width: "100%",
    height: 40,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
});
