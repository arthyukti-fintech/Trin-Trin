import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import { Colors, Spacing, Typography } from "../theme";

type Props = {
    name: string;
    address: string;
    onCall: () => void;
};

export default function RestaurantCard({ name, address, onCall }: Props) {
    return (
        <View style={styles.card}>
            <Text style={Typography.subheading}>{name}</Text>
            <Text style={styles.address}>{address}</Text>

            <Button title="Call Restaurant" onPress={onCall} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        padding: Spacing.md,
        borderRadius: 16,
        marginBottom: Spacing.md,
        shadowColor: Colors.shadow,
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    address: {
        marginVertical: Spacing.sm,
        color: Colors.muted,
    },
});
