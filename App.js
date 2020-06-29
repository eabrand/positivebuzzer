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
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const db = SQLite.openDatabase("db.db");
import TrackerScreen from "./components/Tracker";
import HelpScreen from "./components/Help";
//import * as rssParser from "react-native-rss-parser";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tracker" component={TrackerScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
        <Button title="Tracker" onPress={() => navigation.push("Tracker")} />
        <Button title="Help" onPress={() => navigation.push("Help")} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Home Screen</Text>
        <Button
          title="Go to Help Details"
          onPress={() => navigation.navigate("Details")}
        />
      </View>
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
});
