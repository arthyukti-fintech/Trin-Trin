import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../theme";
import { useGetMyProfileQuery } from "@/redux/services/profileApi";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { data, isLoading, error } = useGetMyProfileQuery();

  const role = data?.data?.role;

  console.log("PROFILE RESPONSE:", data);
  console.log("ROLE:", role);

  /* ---------- REDIRECT LOGIC ---------- */
  useEffect(() => {
    if (!role) return;

    if (role === "resturantsOwner") {
      router.replace("/RestaurentOwnerRestaurents");
    } else {
      router.replace("/Home/CustomerHome");
    }
  }, [role]);

  /* ---------- UI STATES ---------- */
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Failed to load profile</Text>
      </View>
    );
  }

  /* ---------- DEFAULT ---------- */
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accentSoft,
  },
});
