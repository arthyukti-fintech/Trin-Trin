import { Stack, Redirect } from "expo-router";
import { useAuth } from "./context/AuthContext";


export default function RootLayout() {
    const { authState } = useAuth();

    if (!authState.isAuthenticated) {
        return <Redirect href="/login" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
