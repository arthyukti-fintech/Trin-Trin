import { Drawer } from "expo-router/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { Colors } from "./theme";

export default function RootLayout() {
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["bottom", "left", "right"]}>
      <Drawer
        screenOptions={{
          headerShown: false,

          drawerActiveTintColor: Colors.primary,
          drawerInactiveTintColor: Colors.secondary,
          drawerActiveBackgroundColor: Colors.primarySoft,

          drawerStyle: {
            backgroundColor: Colors.card,
            width: screenWidth * 0.75,
          },

          drawerLabelStyle: {
            fontSize: 17,
            fontWeight: "600",
          },

          drawerType: "front",
        }}
      >
        {/* ✅ HOME (app/index.tsx) */}
        <Drawer.Screen
          name="login"
          options={{
            title: "Home",
          }}
        />

        {/* ✅ SETTINGS (optional later) */}
        <Drawer.Screen
          name="settings"
          options={{
            title: "Settings",
          }}
        />

        {/* ✅ HIDDEN ROUTES */}
        <Drawer.Screen
          name="modal"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />

        <Drawer.Screen
          name="Home"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </SafeAreaView>
  );
}
