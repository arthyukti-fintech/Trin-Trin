import React from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { Colors } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import BackHeader from "@/components/BackHeader";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

export default function ProfileScreen() {
  const userName = "Arman";
  const userEmail = "arman@example.com";
  const rewardPoints = 1250;
  const memberSince = "Member since Dec 2023";
  type IconName = React.ComponentProps<typeof Ionicons>["name"];

  const actions: { icon: IconName; label: string; color: string; count: string }[] = [
    { icon: "calendar-outline", label: "Bookings", count: "3", color: "#E23744" },
    { icon: "gift-outline", label: "Offers", count: "12", color: "#FF6B35" },
    { icon: "star", label: "Reviews", count: "8", color: "#FFB800" },
    { icon: "ticket-outline", label: "Vouchers", count: "5", color: "#00AC4F" },
  ];

  const activeOrder = {
    id: "ORD_12345",
    restaurantName: "Pizza Palace",
    amount: 549,
    status: "CONFIRMED", // CONFIRMED | PAID | CANCELLED
    paymentMethod: "UPI / Card",
  };

  const quickActions = [
    { icon: "calendar-outline", label: "Bookings", count: "3", color: "#E23744" },
    { icon: "gift-outline", label: "Offers", count: "12", color: "#FF6B35" },
    { icon: "star", label: "Reviews", count: "8", color: "#FFB800" },
    { icon: "ticket-outline", label: "Vouchers", count: "5", color: "#00AC4F" },
  ];

  const profileMenuItems: {
    icon: IconName;
    label: string;
    subtitle?: string;
    color: string;
    badge?: string;
  }[] = [
      {
        icon: "person-outline",
        label: "Edit Profile",
        subtitle: "Profile, security & preferences",
        color: "#E23744"
      },
      {
        icon: "receipt-outline",
        label: "My Orders",
        subtitle: "View your order history",
        color: "#00AC4F",
        badge: "3"
      },
      {
        icon: "heart-outline",
        label: "Favorite Restaurants",
        subtitle: "Your saved places",
        color: "#FF6B35"
      },
      {
        icon: "location-outline",
        label: "Addresses",
        subtitle: "Manage delivery locations",
        color: "#1E90FF"
      },
      {
        icon: "wallet-outline",
        label: "Payments & Refunds",
        subtitle: "Payment methods & history",
        color: "#9C27B0"
      },
      {
        icon: "shield-checkmark-outline",
        label: "Trin Trin Pro",
        subtitle: "Exclusive benefits & offers",
        color: "#FFB800",
        badge: "NEW"
      },
      {
        icon: "help-circle-outline",
        label: "Help & Support",
        subtitle: "FAQs & contact us",
        color: "#6B7280"
      },
      {
        icon: "settings-outline",
        label: "Settings",
        subtitle: "App preferences",
        color: "#374151"
      },
    ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Gradient Header */}
        <LinearGradient
          colors={[Colors.primary, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientHeader}
        >
          <BackHeader title="Profile" titleStyle={{ color: "#fff" }} />
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.largeAvatar}>
                <Text style={styles.largeAvatarText}>
                  {userName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Pressable style={styles.editAvatarButton}>
                <Ionicons name="camera" size={16} color="#fff" />
              </Pressable>
            </View>

            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>
            <Text style={styles.memberSince}>{memberSince}</Text>
          </View>
        </LinearGradient>

        {/* Rewards Card */}
        {/* ✅ Payment Section – shown only when order is confirmed */}
        {activeOrder?.status === "CONFIRMED" && (
          <View style={styles.paymentSection}>
            <LinearGradient
              colors={["#0f172a", "#020617"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.paymentCard}
            >
              {/* Left Info */}
              <View style={styles.paymentLeft}>
                <View style={styles.paymentIconWrap}>
                  <Ionicons name="wallet-outline" size={26} color="#22c55e" />
                </View>

                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentTitle}>Payment Pending</Text>
                  <Text style={styles.paymentSubtitle}>
                    {activeOrder.restaurantName}
                  </Text>
                  <Text style={styles.paymentAmount}>
                    ₹{activeOrder.amount}
                  </Text>
                </View>
              </View>

              {/* CTA */}
              <Pressable style={styles.payNowButton}>
                <Text style={styles.payNowText}>Pay Now</Text>
                <Ionicons name="arrow-forward" size={16} color="#0f172a" />
              </Pressable>
            </LinearGradient>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <View style={styles.quickActionsGrid}>
            {actions.map((action, i) => (
              <Pressable key={i} style={styles.quickActionCard}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionCount}>{action.count}</Text>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.profileMenu}>
          {profileMenuItems.map((item, i) => (
            <Pressable key={i} style={styles.menuItem} onPress={() => {
              if (item.label === "Edit Profile") {
                router.push("/EditProfile");
              }
            }}>
              <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <View style={styles.menuContent}>
                <View style={styles.menuTitleRow}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {item.badge && (
                    <View style={[styles.badge, item.badge === 'NEW' && styles.newBadge]}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                </View>
                {item.subtitle && (
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.muted} />
            </Pressable>
          ))}

          {/* Logout Button */}
          <Pressable style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color="#E23744" />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        {/* App Version */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>App Version 2.1.0</Text>
        </View>
      </ScrollView >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentSoft
  },

  scrollView: {
    flex: 1,
  },

  gradientHeader: {
    paddingTop: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  profileHeader: {
    alignItems: "center",
    paddingHorizontal: 24,
  },

  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },

  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.5)",
  },

  largeAvatarText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "700",
  },

  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#E23744",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },

  profileName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },

  profileEmail: {
    fontSize: 15,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 6,
  },

  memberSince: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },

  rewardsSection: {
    paddingHorizontal: 20,
    marginTop: -30,
    marginBottom: 20,
  },

  rewardsCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  rewardsLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  rewardsInfo: {
    marginLeft: 16,
  },

  rewardsLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 4,
    fontWeight: "500",
  },

  rewardsValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },

  redeemButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },

  redeemButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFB800",
  },

  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  quickActionCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  quickActionCount: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.secondary,
    marginBottom: 4,
  },

  quickActionLabel: {
    fontSize: 12,
    color: Colors.muted,
    fontWeight: "500",
    textAlign: "center",
  },

  profileMenu: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  menuIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  menuContent: {
    flex: 1,
  },

  menuTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  menuLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.secondary,
  },

  menuSubtitle: {
    fontSize: 13,
    color: Colors.muted,
    marginTop: 2,
  },

  badge: {
    backgroundColor: "#E23744",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },

  newBadge: {
    backgroundColor: "#FFB800",
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 8,
    gap: 10,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E23744",
  },

  footer: {
    alignItems: "center",
    paddingVertical: 30,
  },

  versionText: {
    fontSize: 13,
    color: Colors.muted,
  },
  paymentSection: {
    paddingHorizontal: 20,
    marginTop: -30,
    marginBottom: 24,
  },

  paymentCard: {
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },

  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  paymentIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(34,197,94,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  paymentInfo: {
    flex: 1,
  },

  paymentTitle: {
    fontSize: 13,
    color: "#e5e7eb",
    fontWeight: "600",
    marginBottom: 2,
  },

  paymentSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 6,
  },

  paymentAmount: {
    fontSize: 22,
    fontWeight: "700",
    color: "#22c55e",
  },

  payNowButton: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  payNowText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
  },

});