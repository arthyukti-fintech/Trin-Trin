import React from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { Colors } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import BackHeader from "@/components/BackHeader";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

export default function ProfileScreen() {
  const userName = "Arman";
  const userEmail = "arman@example.com";
  const rewardPoints = 1250;

  const profileMenuItems: { icon: IconName; label: string; color: string }[] = [
    { icon: "person-outline", label: "Edit Profile", color: "#6366F1" },
    { icon: "receipt-outline", label: "My Orders", color: "#10B981" },
    { icon: "heart-outline", label: "Favorites", color: "#EF4444" },
    { icon: "wallet-outline", label: "Wallet", color: "#F59E0B" },
    { icon: "settings-outline", label: "Settings", color: "#6B7280" },
  ];

  return (
    <ScrollView style={styles.container}>
      <BackHeader containerStyle={{backgroundColor:'#ffff'}}/>
      {/* Header */}
      <View style={styles.profileHeader}>
        <View style={styles.largeAvatar}>
          <Text style={styles.largeAvatarText}>
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.profileName}>{userName}</Text>
        <Text style={styles.profileEmail}>{userEmail}</Text>

        <View style={styles.rewardsCard}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <View style={styles.rewardsInfo}>
            <Text style={styles.rewardsLabel}>Reward Points</Text>
            <Text style={styles.rewardsValue}>{rewardPoints}</Text>
          </View>
        </View>
      </View>

      {/* Menu */}
      <View style={styles.profileMenu}>
        {profileMenuItems.map((item, i) => (
          <Pressable key={i} style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: item.color + "20" }]}>
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.muted} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flex: 1,
  },

  profileHeader: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  largeAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  largeAvatarText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
  },

  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.secondary,
    marginBottom: 4,
  },

  profileEmail: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 16,
  },

  rewardsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    marginTop: 10,
  },

  rewardsInfo: {
    marginLeft: 12,
  },

  rewardsLabel: {
    fontSize: 12,
    color: Colors.muted,
    marginBottom: 4,
  },

  rewardsValue: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
  },

  profileMenu: {
    padding: 16,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.secondary,
  },
});
