import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ---------- INITIAL DATA ---------- */
const INITIAL_CASES = [
  {
    id: "1",
    title: "Property Ownership Dispute",
    client: "Rajesh Kumar",
    type: "Civil",
    status: "Active",
  },
  {
    id: "2",
    title: "Consumer Rights Complaint",
    client: "Priya Sharma",
    type: "Consumer",
    status: "Pending",
  },
];

const caseTypes = [
  "Corporate",
  "Civil",
  "Criminal",
  "Consumer",
  "Family",
  "Divorce",
  "Property",
  "Accident",
  "Other",
];

export default function CasesScreen() {
  /* ---------- STATES ---------- */
  const [cases, setCases] = useState(INITIAL_CASES);
  const [modalVisible, setModalVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [caseType, setCaseType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /* ---------- ADD CASE ---------- */
  const addCase = () => {
    if (!title || !clientName || !caseType) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const newCase = {
      id: Date.now().toString(),
      title,
      client: clientName,
      type: caseType,
      status: "Active",
    };

    setCases((prev) => [newCase, ...prev]);

    setTitle("");
    setClientName("");
    setCaseType("");
    setModalVisible(false);
  };

  /* ---------- DELETE CASE ---------- */
  const deleteCase = (id) => {
    Alert.alert("Delete Case", "Are you sure you want to delete this case?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          setCases((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  /* ---------- RENDER CARD ---------- */
  const renderCase = ({ item }) => (
    <View style={styles.caseCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.caseTitle}>{item.title}</Text>

        <View style={styles.headerRight}>
          <Text
            style={[
              styles.status,
              item.status === "Active"
                ? styles.active
                : item.status === "Pending"
                ? styles.pending
                : styles.closed,
            ]}
          >
            {item.status}
          </Text>

          <TouchableOpacity
            onPress={() => deleteCase(item.id)}
            style={styles.deleteIcon}
          >
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.client}>Client: {item.client}</Text>

      <View style={styles.footer}>
        <Text style={styles.type}>{item.type} Case</Text>
        <Ionicons name="chevron-forward" size={18} color="#64748B" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Cases</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* CASE LIST */}
      <FlatList
        data={cases}
        keyExtractor={(item) => item.id}
        renderItem={renderCase}
        showsVerticalScrollIndicator={false}
      />

      {/* ADD CASE MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add New Case</Text>

            <TextInput
              style={styles.input}
              placeholder="Case Title"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Client Name"
              value={clientName}
              onChangeText={setClientName}
            />

            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDropdownOpen(!dropdownOpen)}
            >
              <Text style={{ color: caseType ? "#000" : "#777" }}>
                {caseType || "Select Case Type"}
              </Text>
            </TouchableOpacity>

            {dropdownOpen &&
              caseTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCaseType(type);
                    setDropdownOpen(false);
                  }}
                >
                  <Text>{type}</Text>
                </TouchableOpacity>
              ))}

            <TouchableOpacity style={styles.saveBtn} onPress={addCase}>
              <Text style={styles.saveBtnText}>Save Case</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  addBtn: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 10,
  },

  caseCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  caseTitle: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },

  status: {
    fontSize: 11,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },

  active: {
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
  },

  pending: {
    backgroundColor: "#FEF3C7",
    color: "#92400E",
  },

  closed: {
    backgroundColor: "#E5E7EB",
    color: "#374151",
  },

  deleteIcon: {
    marginLeft: 10,
  },

  client: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 10,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  type: {
    fontSize: 12,
    color: "#64748B",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
  },

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  saveBtnText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },

  cancelText: {
    textAlign: "center",
    marginTop: 10,
    color: "#64748B",
  },
});
