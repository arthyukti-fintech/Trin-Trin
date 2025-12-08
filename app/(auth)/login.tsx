import { View, Text, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Colors, Spacing, Typography } from "../theme";
import Button from "../components/Button";

export default function Login() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={Typography.heading}>Login</Text>
            <Text style={styles.subtitle}>
                Enter your phone number to continue
            </Text>

            <TextInput
                placeholder="10-digit mobile number"
                keyboardType="phone-pad"
                style={styles.input}
            />

            <Button
                title="Send OTP"
                onPress={() => router.push("/(auth)/otp")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: Spacing.lg,
        justifyContent: "center",
    },
    subtitle: {
        marginVertical: Spacing.sm,
        color: Colors.muted,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        padding: Spacing.md,
        marginVertical: Spacing.lg,
        backgroundColor: Colors.card,
    },
});
