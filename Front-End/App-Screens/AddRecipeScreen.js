import React from "react";
import { Text, SafeAreaView, TextInput, View, Image } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { styles } from "../../Styles/defaultStyle";
import { chooseImage, takePhoto } from "../../Back-End/Database/Images";
import { Formik, Form, FieldArray } from "formik";

// expo
import * as Permissions from "expo-permissions";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class AddRecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      previewUri: "",
      ingredient: {},
      ingredientArr: [],
    };
  }

  Recipe = {
    recipeID: "",
    name: "",
    calories: 0,
    servings: 0,
    cookTime: "",
    description: "",
    ingredients: [],
    directions: "",
    imageURL: "",
  };

  deleteIngredient = (index) => {
    console.log("remove ingredient entry");
    this.state.ingredientArr.splice(index, 1);
    this.Recipe.ingredients.splice(index, 1);
    this.setState({ ingredientArr: this.state.ingredientArr });
    console.log(
      "Ingredients: " + "\n" + JSON.stringify(this.Recipe.ingredients)
    );
  };
  addIngredient = () => {
    console.log("add ingredient entry");
    this.setState({
      ingredientArr: [...this.state.ingredientArr, this.state.ingredient],
    });
    this.Recipe.ingredients = this.state.ingredientArr;
    console.log(
      "Ingredients: " + "\n" + JSON.stringify(this.Recipe.ingredients)
    );
  };
  onIngredientHandler = (input, index) => {
    this.state.ingredientArr[index].name = input;
    this.setState({ ingredientArr: this.state.ingredientArr });
  };
  onCountHandler = (input, index) => {
    this.state.ingredientArr[index].count = input;
    this.setState({ ingredientArr: this.state.ingredientArr });
  };
  onUnitHandler = (input, index) => {
    this.state.ingredientArr[index].unit = input;
    this.setState({ ingredientArr: this.state.ingredientArr });
  };

  // ==================================================
  onSubmitButtonPress = () => {
    /*
      Add Form validation logic here
    */
    console.log("submit button pressed");
  };
  onChooseImagePress = async () => {
    await chooseImage(this.Recipe);
  };

  onTakePhotoPress = async () => {
    await takePhoto(this.Recipe);
  };

  getPermissionAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Text style={styles.formHeader}>Add Your Recipe!</Text>

          {/* RECIPE NAME */}
          <View
            style={[styles.formItem, styles.formSection, { paddingRight: 13 }]}
          >
            <Text style={styles.formName}>Name:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(input) => (this.Recipe.name = input)}
            ></TextInput>
          </View>

          {/* DESCRIPTION */}
          <View style={[styles.formItemColumn, styles.formSection]}>
            <Text style={styles.formName}>Description:</Text>
            <TextInput
              style={styles.largeInput}
              placeholder="limit 80 characters"
              numberOfLines={2}
              maxLength={80}
              value={this.state.value}
              multiline={true}
              onChangeText={(value) => {
                this.setState({ value });
                this.Recipe.description = value;
              }}
            ></TextInput>
            <Text style={{ paddingLeft: 8 }}>
              {this.state.value.length}/80 characters left
            </Text>
          </View>

          {/* INGREDIENTS */}

          <View style={[styles.formItemColumn, styles.formSection]}>
            <Text style={styles.formName}>Ingredients:</Text>

            {this.state.ingredientArr.map((ingredient, key) => {
              return (
                <View key={key} style={styles.inputsContainer}>
                  <View style={styles.largeInputContainer}>
                    <TextInput
                      style={styles.ingredientField}
                      value={ingredient.key}
                      placeholder="Name"
                      maxLength={25}
                      onChangeText={(name) =>
                        this.onIngredientHandler(name, key)
                      }
                    ></TextInput>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.ingredientField}
                      placeholder="#"
                      onChangeText={(count) => {
                        this.onCountHandler(count, key);
                      }}
                    ></TextInput>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.ingredientField}
                      placeholder="Units"
                      onChangeText={(unit) => {
                        this.onUnitHandler(unit, key);
                      }}
                    ></TextInput>
                  </View>
                  <MaterialCommunityIcons
                    style={{
                      flex: 1,
                      alignSelf: "center",
                      paddingLeft: 5,
                    }}
                    name="minus-circle"
                    size={30}
                    color="#ff0f0f"
                    backgroundColor="red"
                    onPress={() => this.deleteIngredient()}
                  ></MaterialCommunityIcons>
                </View>
              );
            })}
            <MaterialCommunityIcons
              style={{
                flex: 1,
                alignSelf: "auto",
                paddingLeft: 8,
                paddingTop: 10,
              }}
              name="plus-circle"
              size={30}
              color="black"
              backgroundColor="#89e8e8"
              onPress={() => this.addIngredient()}
            ></MaterialCommunityIcons>
          </View>

          {/* DIRECTIONS */}
          <View style={[styles.formItemColumn, styles.formSection]}>
            <Text style={styles.formName}>Directions:</Text>
            <TextInput
              style={styles.largeInput}
              placeholder="How do you make it?"
              maxLength={2200}
              multiline={true}
              numberOfLines={4}
              onChangeText={(input) => (this.Recipe.directions = input)}
            ></TextInput>
          </View>

          {/* ADDITIONAL INFO */}
          <View style={[styles.formItemColumn, styles.formSection]}>
            <Text style={styles.formName}>Additional Info:</Text>
            <View style={styles.formItemRow}>
              <TextInput
                style={styles.smallTextInput}
                placeholder="Servings"
                onChangeText={(input) => (this.Recipe.servings = input)}
              ></TextInput>
              <TextInput
                style={styles.smallTextInput}
                placeholder="Calories"
                onChangeText={(input) => (this.Recipe.calories = input)}
              ></TextInput>
              <TextInput
                style={styles.smallTextInput}
                placeholder="Cook Time"
                onChangeText={(input) => (this.Recipe.cookTime = input)}
              ></TextInput>
            </View>
          </View>

          {/* IMAGE PREVIEW */}
          <View style={[styles.formItemColumn, styles.formSection]}>
            <Text style={styles.formName}>What should it look like?</Text>
            <View style={styles.formItemRow}>
              <TouchableOpacity style={{ flex: 1 }}>
                <MaterialCommunityIcons
                  style={styles.cameraIcons}
                  name="camera"
                  size={50}
                  color="black"
                  backgroundColor="#89e8e8"
                  onPress={() => this.onTakePhotoPress()}
                ></MaterialCommunityIcons>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1 }}>
                <MaterialCommunityIcons
                  style={styles.cameraIcons}
                  name="folder-image"
                  size={50}
                  color="black"
                  backgroundColor="#89e8e8"
                  onPress={() => this.onChooseImagePress()}
                ></MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
            <Image
              source={require("../../assets/sampleFoods/Sushi.jpg")}
              style={[styles.cardImage, { borderRadius: 10 }]}
            ></Image>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.onSubmitButtonPress()}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              Submit Recipe!
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
