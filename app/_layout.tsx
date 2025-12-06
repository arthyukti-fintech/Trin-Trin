import { Drawer } from "expo-router/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

export default function RootLayout() {
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: '#0b381d',
          drawerInactiveTintColor: '#202020',
          drawerActiveBackgroundColor: '#e6ecf1',
          drawerStyle: {
            backgroundColor: '#ffffff',
            width: screenWidth * 0.75,
          },
          drawerLabelStyle: {
            fontSize: 17,
            fontWeight: '600',
          },
          drawerType: 'front',
        }}
      >

        {/* 🔹 Your HOME ENTRY (app/index.jsx) */}
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />

        {/* 🔹 Add your other Drawer screens */}
        <Drawer.Screen
          name="settings"
          options={{
            title: "Settings",
          }}
        />

        {/* 🔹 Hidden screens (not shown inside Drawer list) */}
        <Drawer.Screen
          name="modal"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />

      </Drawer>
    </SafeAreaView>
  );
}
