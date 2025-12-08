import { View, Text, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Colors, Spacing, Typography } from "../theme";
import Button from "../components/Button";

export default function Otp() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={Typography.heading}>Verify OTP</Text>
            <Text style={styles.subtitle}>
                OTP sent to your mobile number
            </Text>

            <TextInput
                placeholder="Enter OTP"
                keyboardType="number-pad"
                style={styles.input}
            />

            <Button
                title="Verify & Continue"
                onPress={() => router.replace("/(user)")}
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
        textAlign: "center",
        fontSize: 18,
        letterSpacing: 8,
    },
});
