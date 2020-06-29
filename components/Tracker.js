import React, { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import LoginScreen from "./Login";

export default function TrackerScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
        <Button title="Tracker" onPress={() => navigation.push("Tracker")} />
        <Button title="Help" onPress={() => navigation.push("Help")} />
      </View>

      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  nav: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 10,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
  submitIcon: {
    width: 40,
    height: 40,
    marginTop: 12,
    marginRight: 12,
  },
  helpInfo: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    opacity: 0.8,
  },
});
