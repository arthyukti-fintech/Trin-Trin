import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export default function TabLayout() {
  const { authState } = useAuth();
  const isLoggedIn = authState.isAuthenticated;


  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "index")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "restaurant")
            iconName = focused ? "restaurant" : "restaurant-outline";
          else if (route.name === "cart")
            iconName = focused ? "cart" : "cart-outline";
          else if (route.name === "order-status")
            iconName = focused ? "list" : "list-outline";
          else if (route.name === "profile")
            iconName = focused ? "person" : "person-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="restaurant" options={{ title: "Restaurant" }} />
      <Tabs.Screen name="cart" options={{ title: "Cart" }} />
      <Tabs.Screen name="order-status" options={{ title: "Orders" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}