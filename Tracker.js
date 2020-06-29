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
const db = SQLite.openDatabase("db.db");

function Items({ done: doneHeading, onPressItem }) {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from info where done = ?;`,
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  const heading = doneHeading ? "Uploaded" : "Not Uploaded";

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value, timestamp }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>
            {timestamp}
            {"\n"}
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ScrollItems({ done: doneHeading, onPressItem }) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value, timestamp }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>
            {timestamp}
            {"\n"}
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function TrackerScreen({ navigation }) {
  const [text, setText] = React.useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists info (id integer primary key not null, done int, value text, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);"
      );
    });
  }, []);

  const add = (text) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into info (done, value) values (0, ?)", [text]);
        tx.executeSql("select * from info", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
        <Button title="Tracker" onPress={() => navigation.push("Tracker")} />
        <Button title="Help" onPress={() => navigation.push("Help")} />
      </View>
      <View style={styles.flexRow}>
        <TextInput
          onChangeText={(text) => setText(text)}
          onSubmitEditing={() => {
            add(text);
            setText(null);
          }}
          placeholder="type information or incident"
          style={styles.input}
          value={text}
        />
        <TouchableOpacity
          title="submit"
          onPress={() => {
            add(text);
            setText(null);
          }}
        >
          <Image
            source={require("../images/submit.png")}
            style={styles.submitIcon}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.helpInfo}>
          Submit information above, if you would like to submit the record to an
          external service, click once, to remove the item from your phone,
          double click the record
        </Text>
      </View>
      <View>
        <TouchableOpacity
          title="showHide"
          onPress={() => {
            add(text);
            setText(null);
          }}
        >
          <Text>Show / Hide</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.listArea}>
        <Items
          key={`forceupdate-todo-${forceUpdateId}`}
          done={false}
          onPressItem={(id) =>
            db.transaction(
              (tx) => {
                tx.executeSql(`update info set done = 1 where id = ?;`, [id]);
              },
              null,
              forceUpdate
            )
          }
        />
        <Items
          done
          key={`forceupdate-done-${forceUpdateId}`}
          onPressItem={(id) =>
            db.transaction(
              (tx) => {
                tx.executeSql(`delete from info where id = ?;`, [id]);
              },
              null,
              forceUpdate
            )
          }
        />
      </ScrollView>
    </View>
  );
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
