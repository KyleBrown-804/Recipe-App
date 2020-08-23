import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "../../Styles/defaultStyle";
import { getAllRecipes } from "../../Back-End/Database/RecipeQueries";

export default function RecipeScreen() {
  let User_Recipes = [];
  const [Recipes, setRecipes] = useState(User_Recipes);

  useEffect(() => {
    getRecipeList();
  }, [Recipes]);

  // try to collect Recipe objects into array here
  async function getRecipeList() {
    let retrieved_recipes = await getAllRecipes();
    if (Recipes.length != retrieved_recipes.length) {
      setRecipes(retrieved_recipes);
    }
    return retrieved_recipes.length;
  }

  const pressHandler = (name) => {
    console.log(name);
  };

  const noRecipes = (
    <SafeAreaView style={styles.container}>
      <Text>No Recipes :(</Text>
    </SafeAreaView>
  );

  if (Recipes.length <= 0) {
    return noRecipes;
  }

  return (
    <SafeAreaView style={styles.recipesContainer}>
      <FlatList
        data={Recipes}
        keyExtractor={(item) => item.calories.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => pressHandler(item.name)}
          >
            <Image style={styles.cardImage} source={{ uri: item.imageURL }} />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
