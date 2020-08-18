import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ImageStore,
} from "react-native";
import { styles } from "../../Styles/defaultStyle";

export default function RecipeScreen() {
  const Recipes = [
    {
      id: "1",
      title: "Chicken Katsu",
      src: "../../assets/sampleFoods/ChickenKatsu.jpg",
    },
    { id: "2", title: "Sushi Roll", src: "../../assets/sampleFoods/Sushi.jpg" },
    { id: "3", title: "Yakisoba", src: "../../assets/sampleFoods/Yakisoba.jpg" },
    {
      id: "4",
      title: "Street Tacos",
      src: "../../assets/sampleFoods/StreetTacos.jpg",
    },
    {
      id: "5",
      title: "Quesadillas",
      src: "../../assets/sampleFoods/Quesadillas.jpg",
    },
    { id: "6", title: "Homemade Salsa", src: "../../assets/sampleFoods/Salsa.jpg" },
    {
      id: "7",
      title: "Margaritas",
      src: "../../assets/sampleFoods/Margaritas.jpg",
    },
  ];

  const pressHandler = (title) => {
    console.log(title);
  };

  return (
    <SafeAreaView style={styles.recipesContainer}>
      <FlatList
        data={Recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => pressHandler(item.title)}>
            <Image
              style={styles.cardImage}
              source={require("../../assets/sampleFoods/Sushi.jpg")}
            />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
