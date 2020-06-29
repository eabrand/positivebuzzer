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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";

export default function Login() {
  const [pin, setPin] = React.useState(null, false);

  React.useEffect(() => {
    SecureStore.getItemAsync("userinfo")
      .then((userdata) => {
        let userinfo = JSON.parse(userdata);
        if (userinfo) {
          React.setState({ pin: userinfo.pin });
          React.setState({ setPin: false });
        }
      })
      .catch((error) => console.log("No user info", error));
  }, []);

  const add = (pin) => {
    // is text empty?
    if (pin === null || pin === "") {
      return false;
    }

    console.log("State");
    console.log(pin);

    SecureStore.setItemAsync(
      "userinfo",
      JSON.stringify({ pin: pin })
    ).catch((error) => console.log("Could not save user info", error));
  };

  console.log(pin);
  if (pin == null) {
    return (
      <View style={styles.flexRow}>
        <TextInput
          onChangeText={(pin) => setPin(pin)}
          onSubmitEditing={() => {
            add(pin);
            setPin(null);
          }}
          placeholder="user pin"
          style={styles.input}
          value={pin}
        />
        <TouchableOpacity
          title="submit"
          onPress={() => {
            add(pin);
            setPin(null);
          }}
        >
          <Image
            source={require("../images/submit.png")}
            style={styles.submitIcon}
          />
        </TouchableOpacity>
      </View>
    );
  } else return null;
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
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
