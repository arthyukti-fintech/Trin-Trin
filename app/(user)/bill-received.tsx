import { View, StyleSheet, Text } from "react-native";
import { Colors, Spacing, Typography } from "../theme";
import { router } from "expo-router";
import BackHeader from "@/components/BackHeader";
import BillBreakdown from "@/components/BillBreakdown";
import Button from "@/components/Button";

export default function BillReceived() {
    return (
        <>
            <BackHeader title="Bill Received" />
            <View style={styles.container}>
                <Text style={Typography.heading}>Bill Received ✅</Text>

                <View style={{ marginVertical: Spacing.lg }}>
                    <BillBreakdown bill={450} platformFee={20} deliveryFee={40} />
                </View>

                <Button title="Proceed to Pay" onPress={() => router.push("/payment")} />
            </View>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: Spacing.md,
    },
});
