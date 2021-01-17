import React from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../Styles/defaultStyle";
import {
  chooseImage,
  takePhoto,
  uploadRecipe,
} from "../../Back-End/Database/Images";
import { generate } from "shortid";
import * as yup from "yup";
// expo
import * as Permissions from "expo-permissions";
import { MaterialCommunityIcons } from "@expo/vector-icons";

let recipeSchema = yup.object().shape({
  recipeID: yup.string().notRequired(),
  name: yup.string().min(3).max(50).required("Name required!"),
  calories: yup
    .number()
    .positive("Calories must be positive")
    .integer("Calories must be a whole number")
    .notRequired(),
  servings: yup
    .number()
    .positive()
    .integer()
    .required("Serving amount required!"),
  cookTime: yup.string().max(30).notRequired(),
  description: yup.string().max(80).required("Description required!"),
  ingredients: yup.array().required("At least one ingredient required!"),
  directions: yup.string().max(2200).required("Directions required!"),
  imageUrl: yup.string().notRequired(),
});

export default class AddRecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descCount: "",
      direCount: "",
      previewUri: "",
      confirmModal: false,
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
    imageUrl: "",
  };

  componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  };

  /*
    Ingredients fields functions
    ===================================================
  */
  deleteIngredient = (loc) => {
    this.setState({
      ingredientArr: this.state.ingredientArr.filter(
        (item, index) => index !== loc
      ),
    });
  };
  addIngredient = () => {
    const ingredientID = generate();
    this.setState({
      ingredientArr: [
        ...this.state.ingredientArr,
        { id: ingredientID, name: "", count: "", units: "" },
      ],
    });
    this.Recipe.ingredients = this.state.ingredientArr;
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
    this.state.ingredientArr[index].units = input;
    this.setState({ ingredientArr: this.state.ingredientArr });
  };

  /*
    Button on press handlers
    ===================================================
  */
  submitRecipe = async () => {
    await uploadRecipe(this.state.previewUri, this.Recipe)
      .then(() => {
        Alert.alert("Your recipe has been added successfully!");
        this.setModalVisible(false);
      })
      .catch(() => {
        Alert.alert(
          "An error occured trying to add your recipe, please try again!"
        );
      });
  };
  onSubmitButtonPress = async () => {
    let validated = false;

    if (this.state.previewUri !== "") {
      this.Recipe.ingredients = this.state.ingredientArr;
      await recipeSchema
        .validate(this.Recipe)
        .then(() => {
          validated = true;
        })
        .catch((err) => {
          Alert.alert("Error", err.message);
        });
    } else {
      Alert.alert("You must supply an image to accompany your recipe");
    }
    if (validated) {
      this.setModalVisible(true);
    }
  };
  setModalVisible = (visible) => {
    this.setState({ confirmModal: visible });
  };
  onChooseImagePress = async () => {
    await chooseImage(this.Recipe).then((uri) => {
      if (uri !== "") {
        this.setState({ previewUri: uri });
      }
    });
  };
  onTakePhotoPress = async () => {
    await takePhoto(this.Recipe).then((uri) => {
      if (uri !== "") {
        this.setState({ previewUri: uri });
      }
    });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.formHeader}>Add Your Recipe!</Text>

          {/* RECIPE NAME */}
          <View
            style={[
              styles.formItemRow,
              styles.formSection,
              { paddingRight: 8 },
            ]}
          >
            <Text style={styles.formName}>Name:</Text>
            <TextInput
              style={styles.textInput}
              maxLength={50}
              onChangeText={(input) => (this.Recipe.name = input)}
            ></TextInput>
          </View>

          {/* DESCRIPTION */}
          <View style={[styles.formItemColumn, styles.formSection]}>
            <Text style={styles.formName}>Description:</Text>
            <TextInput
              style={styles.largeInput}
              numberOfLines={2}
              maxLength={80}
              value={this.state.value}
              multiline={true}
              onChangeText={(input) => {
                this.setState({ descCount: input });
                this.Recipe.description = input;
              }}
            ></TextInput>
            <Text style={{ paddingLeft: 8 }}>
              {this.state.descCount.length}/80 characters left
            </Text>
          </View>

          {/* INGREDIENTS */}
          <View style={[styles.formItemColumn, styles.formSection]}>
            <Text style={styles.formName}>Ingredients:</Text>

            {this.state.ingredientArr.map((ingredient, key) => {
              return (
                <View key={ingredient.id} style={styles.inputsContainer}>
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
                      keyboardType={"numeric"}
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
                    onPress={() => {
                      this.deleteIngredient(key);
                    }}
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
              numberOfLines={2}
              onChangeText={(input) => {
                this.setState({ direCount: input });
                this.Recipe.directions = input;
              }}
            ></TextInput>
            <Text style={{ paddingLeft: 8 }}>
              {this.state.direCount.length}/2200 characters left
            </Text>
          </View>

          {/* ADDITIONAL INFO */}
          <View style={[styles.formItemColumn, styles.formSection]}>
            <Text style={styles.formName}>Additional Info:</Text>
            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.smallTextInput}
                  placeholder="Servings"
                  onChangeText={(input) => (this.Recipe.servings = input)}
                  keyboardType={"numeric"}
                ></TextInput>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.smallTextInput}
                  placeholder="Calories"
                  onChangeText={(input) => (this.Recipe.calories = input)}
                  keyboardType={"numeric"}
                ></TextInput>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.smallTextInput}
                  placeholder="Time"
                  maxLength={30}
                  onChangeText={(input) => (this.Recipe.cookTime = input)}
                ></TextInput>
              </View>
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
            {this.state.previewUri === "" ? (
              <View
                style={[
                  styles.cardImage,
                  {
                    justifyContent: "center",
                    borderRadius: 10,
                    backgroundColor: "lightgray",
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="image-area"
                  size={100}
                  style={{ alignSelf: "center" }}
                ></MaterialCommunityIcons>
                <Text style={{ fontSize: 22, textAlign: "center" }}>
                  Image Preview
                </Text>
              </View>
            ) : (
              <Image
                source={{ uri: this.state.previewUri }}
                style={[styles.cardImage, { borderRadius: 10 }]}
              ></Image>
            )}
          </View>

          {/* SUBMIT BUTTON */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.onSubmitButtonPress();
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              Submit Recipe!
            </Text>
          </TouchableOpacity>

          {/* CONFIRMATION MODAL */}
          <Modal
            visible={this.state.confirmModal}
            transparent={true}
            onRequestClose={() => this.setState({ confirmModal: false })}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.formHeader}>
                  Are you ready to post {this.Recipe.name}?
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => this.setModalVisible(false)}
                  >
                    <Text style={{ textAlign: "center", fontSize: 20 }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => this.submitRecipe()}
                  >
                    <Text style={{ textAlign: "center", fontSize: 20 }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
