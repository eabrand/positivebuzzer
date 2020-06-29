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
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import HiddenTracker from "./HiddenTracker";

/* Login Component */
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      password: "",
      entry: "",
    };
  }

  /* Fetch if user has created a pin */
  componentDidMount = async () => {
    SecureStore.getItemAsync("userinfo")
      .then((userdata) => {
        let userinfo = userdata;
        //JSON.parse(userdata);
        if (userinfo) {
          this.setState({ password: userdata });
          console.log("In Login, ", userinfo);
        } else {
          //this.setState({ password: "", entry: "" });
          console.log("no password saved");
        }
      })
      .catch((error) => console.log("No user info", error));
  };

  pinInput = React.createRef();

  /* Check if code matches existing pin */
  _checkCode = (code) => {
    //console.log(`_checkCode Password: `, this.state.password);
    if (code != this.state.password) {
      this.pinInput.current.shake().then(() => this.setState({ code: "" }));
    } else {
      this.setState({ entry: code });
    }
    //console.log(`_checkCode Entry: `, this.state.entry);
  };

  /* set pin if one is not set already */
  _setCode = async (code) => {
    console.log(`_setCode code: `, code);

    this.setState({ password: code });
    /*  this.pinInput.current
        .shake()
        .then(() =>*/
    SecureStore.setItemAsync("userinfo", code).catch((error) =>
      console.log("No user info", error)
    );
    //let stringify = JSON.stringify(this.state);

    console.log(`_setCode Password: `, this.state.password);
    /*    console.log(`_setCode Password: `, this.state.password);*/
  };

  /* return pin save, pin verify, or no pin needed because already logged in */
  render() {
    const { code, password, entry } = this.state;

    console.log(`Render Code: `, code);
    console.log(`Render Password: `, password);
    console.log(`Render Entry: `, entry);

    console.log("CODE?? ", code);
    if (password == "" || password == null) {
      return (
        <View style={styles.pinInput}>
          <Text style={styles.title}>Set Your Code</Text>
          <SmoothPinCodeInput
            ref={this.pinInput}
            value={code}
            onTextChange={(code) => this.setState({ code })}
            onFulfill={this._setCode}
            onBackspace={() => console.log("No more back.")}
          />
          <Text style={styles.helpInfo}>
            Store password for your records. Cannot reset due to privacy
            concerns.
          </Text>
        </View>
      );
    } else if (entry == "" || entry == null) {
      return (
        <View style={styles.pinInput}>
          <Text style={styles.title}>Unlock</Text>
          <SmoothPinCodeInput
            ref={this.pinInput}
            value={code}
            onTextChange={(code) => this.setState({ code })}
            onFulfill={this._checkCode}
            onBackspace={() => console.log("No more back.")}
          />
          <Text style={styles.helpInfo}>Enter your pin to view entries</Text>
        </View>
      );
    } else {
      return <HiddenTracker />;
    }
  }
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pinInput: {
    padding: 8,
  },
});
