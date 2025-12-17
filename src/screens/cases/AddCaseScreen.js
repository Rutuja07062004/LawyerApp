import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function AddCaseScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [type, setType] = useState("");

  const handleSave = () => {
    if (!title || !client || !type) {
      alert("Please fill all fields");
      return;
    }

    // later we will save this to backend / state
    alert("Case added successfully");

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Case Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter case title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Client Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter client name"
        value={client}
        onChangeText={setClient}
      />

      <Text style={styles.label}>Case Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Civil / Criminal / Consumer"
        value={type}
        onChangeText={setType}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Case</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
