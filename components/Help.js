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
      .catch((err) => console.error(err));
  };

  const _checkSMS = () => {
    console.log("In _checkSMS");
    SMS.isAvailableAsync().then((isAvailable) => {
      if (isAvailable) {
        console.log("sending message");
        return SMS.sendSMSAsync("9513291621", "LOVEIS").catch((err) => {
          console.log("Send Text Error");
        });
      }
      //if (isAvailable) return SMS.sendSMSAsync("8663319474", "LOVEIS");
      else {
        console.error("Cannot Send Text");
      }
    });
  };

  const _dialCallReg = () => {
    _dialCall("19513291621");
    //  _dialCall("1-800-799-7233");
  };

  const _dialCallTTY = () => {
    _dialCall("1-800-799-3224");
  };

  /*
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    const { result } = await SMS.sendSMSAsync(
      ['8663319474'],
      'LOVEIS'
    );
    return result;
  } else return 'unknown';*/

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
          <Text onPress={() => _dialCall("9513291621")}>1-800-799-7233 | </Text>
          <Text onPress={() => _dialCall("9513291621")}>
            1-800-787-3224 (TTY)
          </Text>
        </Text>
        <Text style={styles.helpInfo}>
          For anyone affected by domestic abuse who cannot speak at the moment,
          text LOVEIS to 1-866-331-9474.
        </Text>
        <TouchableOpacity
          style={styles.texting}
          title="SEND TEXT"
          onPress={() => _checkSMS()}
        >
          <Text>SEND TEXT</Text>
        </TouchableOpacity>
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
  texting: {
    padding: 10,
    margin: 15,
    borderColor: "#000",
    alignSelf: "center",
    alignItems: "stretch",
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 10,
  },
});
