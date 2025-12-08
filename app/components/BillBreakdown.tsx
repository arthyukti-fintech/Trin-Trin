import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../theme";

type Props = {
    bill: number;
    platformFee: number;
    deliveryFee: number;
};

export default function BillBreakdown({
    bill,
    platformFee,
    deliveryFee,
}: Props) {
    const total = bill + platformFee + deliveryFee;

    return (
        <View style={styles.box}>
            <Row label="Food Bill" value={`₹${bill}`} />
            <Row label="Platform Fee" value={`₹${platformFee}`} />
            <Row label="Delivery Fee" value={`₹${deliveryFee}`} />
            <View style={styles.divider} />
            <Row label="Total" value={`₹${total}`} bold />
        </View>
    );
}

const Row = ({
    label,
    value,
    bold,
}: {
    label: string;
    value: string;
    bold?: boolean;
}) => (
    <View style={styles.row}>
        <Text style={bold ? styles.bold : styles.text}>{label}</Text>
        <Text style={bold ? styles.bold : styles.text}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    box: {
        backgroundColor: Colors.card,
        padding: Spacing.md,
        borderRadius: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 6,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.sm,
    },
    text: {
        color: Colors.secondary,
    },
    bold: {
        fontWeight: "700",
        fontSize: 16,
    },
});
