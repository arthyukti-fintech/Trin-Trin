import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../theme";
import { router } from "expo-router";
import Button from "../components/Button";

export default function Payment() {
    return (
        <View style={styles.container}>
            <Text style={Typography.heading}>Mock Payment</Text>
            <Text style={styles.info}>Simulate Razorpay / UPI</Text>

            <View style={{ marginTop: Spacing.xl }}>
                <Button
                    title="Pay ₹510"
                    onPress={() => router.replace("/tracking")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: Spacing.md,
    },
    info: {
        marginTop: Spacing.sm,
        color: Colors.muted,
    },
});
