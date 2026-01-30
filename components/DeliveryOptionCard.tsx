import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type DeliveryOption = "self" | "delivery";

type DeliveryOptionCardProps = {
    type: DeliveryOption;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    charge: number;
    selected: boolean;
    onSelect: () => void;
};

export default function DeliveryOptionCard({
    title,
    description,
    icon,
    charge,
    selected,
    onSelect,
}: DeliveryOptionCardProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                selected && styles.cardSelected,
                { opacity: pressed ? 0.9 : 1 },
            ]}
            onPress={onSelect}
        >
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={24} color={selected ? "#22c55e" : "#666"} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View
                    style={[
                        styles.radioOuter,
                        selected && styles.radioOuterSelected,
                    ]}
                >
                    {selected && <View style={styles.radioInner} />}
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={[styles.charge, selected && styles.chargeSelected]}>
                    {charge === 0 ? "Free" : `+₹${charge.toFixed(2)}`}
                </Text>
                {charge > 0 && (
                    <Text style={styles.chargeLabel}>delivery charge</Text>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: "transparent",
        marginBottom: 12,
    },
    cardSelected: {
        backgroundColor: "#f0fdf4",
        borderColor: "#22c55e",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 17,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    description: {
        fontSize: 13,
        color: "#666",
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
    },
    radioOuterSelected: {
        borderColor: "#22c55e",
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#22c55e",
    },
    footer: {
        alignItems: "flex-start",
    },
    charge: {
        fontSize: 18,
        fontWeight: "700",
        color: "#666",
    },
    chargeSelected: {
        color: "#22c55e",
    },
    chargeLabel: {
        fontSize: 11,
        color: "#888",
        marginTop: 2,
    },
});