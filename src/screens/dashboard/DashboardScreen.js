import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Your cases and client updates at a glance
        </Text>
      </View>

      {/* STATS GRID */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Active Clients"
          value="24"
          note="+3 this week"
          icon="people-outline"
          onPress={() => navigation.navigate("Clients")}
        />

        <StatCard
          title="Active Cases"
          value="18"
          note="+5 this month"
          icon="briefcase-outline"
          onPress={() => navigation.navigate("Cases")}
        />

        <StatCard
          title="Pending Authorizations"
          value="3"
          note="Requires attention"
          icon="time-outline"
          onPress={() => navigation.navigate("Cases")}
        />

        <StatCard
          title="AI Drafts Generated"
          value="42"
          note="+12 this week"
          icon="document-text-outline"
          onPress={() => navigation.navigate("Cases")}
        />
      </View>

      {/* RECENT CLIENTS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Clients</Text>

        <ClientItem
          initials="RK"
          name="Rajesh Kumar"
          caseType="Property Dispute"
          status="Active"
          time="2 days ago"
          onPress={() => navigation.navigate("Clients")}
        />

        <ClientItem
          initials="PS"
          name="Priya Sharma"
          caseType="Consumer Rights"
          status="Active"
          time="3 days ago"
          onPress={() => navigation.navigate("Clients")}
        />

        <ClientItem
          initials="AP"
          name="Amit Patel"
          caseType="Civil Matter"
          status="Active"
          time="5 days ago"
          onPress={() => navigation.navigate("Clients")}
        />
      </View>

      {/* QUICK ACTIONS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>

        <QuickAction
          icon="person-add-outline"
          label="Add New Client"
          onPress={() => navigation.navigate("Clients")}
        />

        <QuickAction
          icon="folder-open-outline"
          label="Add New Case"
          onPress={() => navigation.navigate("Cases")}
        />

        <QuickAction
          icon="mic-outline"
          label="Recent Recordings"
          onPress={() => alert("Coming soon")}
        />
      </View>
    </ScrollView>
  );
}

/* ---------- COMPONENTS ---------- */

const StatCard = ({ title, value, note, icon, onPress }) => (
  <TouchableOpacity style={styles.statCard} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#2563EB" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statNote}>{note}</Text>
  </TouchableOpacity>
);

const ClientItem = ({
  initials,
  name,
  caseType,
  status,
  time,
  onPress,
}) => (
  <TouchableOpacity style={styles.clientRow} onPress={onPress}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.clientName}>{name}</Text>
      <Text style={styles.clientCase}>{caseType}</Text>
    </View>

    <View style={styles.clientRight}>
      <Text
        style={[
          styles.status,
          status === "Active" ? styles.active : styles.pending,
        ]}
      >
        {status}
      </Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  </TouchableOpacity>
);

const QuickAction = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
    <Ionicons name={icon} size={20} color="#2563EB" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },

  header: {
    marginTop: 25,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 8,
  },
  statTitle: {
    fontSize: 13,
    color: "#475569",
    marginTop: 4,
  },
  statNote: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 12,
  },

  clientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontWeight: "700",
    color: "#1E40AF",
  },
  clientName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  clientCase: {
    fontSize: 12,
    color: "#64748B",
  },
  clientRight: {
    alignItems: "flex-end",
  },
  status: {
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 2,
  },
  active: {
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
  },
  pending: {
    backgroundColor: "#FEF3C7",
    color: "#92400E",
  },
  time: {
    fontSize: 11,
    color: "#64748B",
  },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  actionText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "500",
  },
});
