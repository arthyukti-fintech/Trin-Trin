import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { closeSocket, initSocket } from "./socket/services/socket";

/* 🔹 SOCKET INITIALIZER */
function SocketInitializer() {
  const { authState } = useAuth();

  console.log("🔁 SocketInitializer rendered");
  console.log("AUTH STATE:", authState);

  useEffect(() => {
    console.log("⚙️ SocketInitializer useEffect fired");

    if (authState.isAuthenticated && authState.user) {
      console.log("🚀 Initializing socket with user:", authState.user.id);

      initSocket(
        undefined,
        undefined,        // no token
        authState.user.id // real backend id
      );
    } else {
      console.log("🛑 Closing socket (not authenticated)");
      closeSocket();
    }
  }, [authState.isAuthenticated, authState.user?.id]);

  return null;
}

/* 🔹 ROOT LAYOUT */
export default function RootLayout() {

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <AuthProvider>
          <SocketInitializer />
          <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
