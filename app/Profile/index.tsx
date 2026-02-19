import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { Colors } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import BackHeader from "@/components/BackHeader";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useGetMyProfileQuery } from "@/redux/services/profileApi";
import * as ImagePicker from 'expo-image-picker';
import { Image, Alert } from 'react-native';


type IconName = React.ComponentProps<typeof Ionicons>["name"];

export default function ProfileScreen() {
  const { data, isLoading, error, refetch, isFetching } = useGetMyProfileQuery();

  console.log(data,
    isLoading,
    isFetching,
    error, "this is profile data")
  const userName = "Arman";
  const userEmail = "arman@example.com";
  const rewardPoints = 1250;
  const memberSince = "Member since Dec 2023";
  type IconName = React.ComponentProps<typeof Ionicons>["name"];
  const [profileImage, setProfileImage] = useState<string | null>(null);

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


  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please allow gallery access');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };


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
          <BackHeader title="Profile"  titleStyle={{ color: "#fff" }} />
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <View style={styles.largeAvatar}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.avatarFallback}>
                    <Text style={styles.largeAvatarText}>
                      {data?.data?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </Text>
                  </View>
                )}
              </View>

              <Pressable
                style={styles.editAvatarButton}
                onPress={pickImage}
                hitSlop={10}
              >
                <Ionicons name="camera" size={18} color="#fff" />
              </Pressable>
            </View>
          </View>

        </LinearGradient>

        {/* Rewards Card */}
        {/* ✅ Payment Section – shown only when order is confirmed */}
        {/* {activeOrder?.status === "CONFIRMED" && (
          <View style={styles.paymentSection}>
            <LinearGradient
              colors={["#0f172a", "#020617"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.paymentCard}
            >
             
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

             
              <Pressable style={styles.payNowButton}>
                <Text style={styles.payNowText}>Pay Now</Text>
                <Ionicons name="arrow-forward" size={16} color="#0f172a" />
              </Pressable>
            </LinearGradient>
          </View>
        )} */}

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
              if (item.label === "My Orders") {
                router.push("/MyOrders");
              }
              if (item.label === 'Favorite Restaurants') {
                router.push('/MyOrderStatus')
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  largeAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },

  largeAvatarText: {
    fontSize: 48,
    color: '#555',
    fontWeight: 'bold',
  },

   avatarFallback: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary + '20', // Semi-transparent primary color
  },
   avatarWrapper: {
    position: 'relative',
    width: 130,
    height: 130,
  },

  editAvatarButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 20,
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
    marginTop: 20
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