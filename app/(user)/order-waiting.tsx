import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../theme";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Waiting() {
    useEffect(() => {
        setTimeout(() => {
            router.replace("/bill-received");
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.text}>
                Waiting for restaurant to send the bill…
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        marginTop: Spacing.md,
        ...Typography.subheading,
    },
});
