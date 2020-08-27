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
    };
  }

  Recipe = {
    recipeID: "",
    name: "",
    calories: 0,
    servings: 0,
    cookTime: "",
    description: "",
    ingredients: [""],
    directions: "",

    imageURL: "",
  };

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
          
          {/* Use Formik in order to create dynamic form entries */}
            <Formik>
              
            </Formik>
          {/* INGREDIENTS */}
          {
            <View style={[styles.formItemColumn, styles.formSection]}>
              <Text style={styles.formName}>Ingredients:</Text>
              <View style={styles.formItemRow}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ingredient"
                  maxLength={25}
                ></TextInput>
                <TextInput
                  style={styles.smallTextInput}
                  placeholder="Count"
                ></TextInput>
                <TextInput
                  style={styles.smallTextInput}
                  placeholder="Units"
                ></TextInput>
              </View>
            </View>
          }

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
            onLo
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
