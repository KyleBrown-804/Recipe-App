import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";

export default function RecipeScreen() {
  const Recipes = [
    { id: "1", title: "Chicken Katsu" },
    { id: "2", title: "Sushi Roll" },
    { id: "3", title: "Yakisoba" },
    { id: "4", title: "Street Tacos" },
    { id: "5", title: "Quesadillas" },
    { id: "6", title: "Homemade Salsa" },
    { id: "7", title: "Margaritas" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "lightcoral",
    fontSize: 24,
    marginHorizontal: 10
  },
});
