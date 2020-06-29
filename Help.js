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
  Linking,
} from "react-native";
import * as SQLite from "expo-sqlite";
import * as SMS from "expo-sms";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const db = SQLite.openDatabase("db.db");

export default function HelpScreen({ navigation }) {
  //export default class Anchor extends React.Component {
  const _dialCall = (number) => {
    if (Platform.OS === "android") {
      number = `tel:${number}`;
    }
    /*else {
      number = `telprompt:${number}`;
    }*/

    //Linking.openURL(number);
    Linking.canOpenURL(number)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(number)
            .then((data) => console.error("then ", data))
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
        <Button title="Tracker" onPress={() => navigation.push("Tracker")} />
        <Button title="Help" onPress={() => navigation.push("Help")} />
      </View>
      <View style={styles.listArea}>
        <Text style={styles.heading}>Resources to Help</Text>
        <Text style={styles.helpInfo}>National Domestic Violence Hotline:</Text>
        <Text style={styles.helpInfo}>
          <Text onPress={_dialCall("1-800-799-7233")}>1-800-799-7233 | </Text>
          <Text onPress={_dialCall("1-800-799-3224")}>
            1-800-787-3224 (TTY)
          </Text>
        </Text>
        <Text style={styles.helpInfo}>
          For anyone affected by domestic abuse who cannot speak at the moment,
          text LOVEIS to 1-866-331-9474.
        </Text>
        <Button title="SEND TEXT" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
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
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 0,
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
    padding: 5,
    opacity: 0.8,
  },
});
