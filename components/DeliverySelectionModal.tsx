import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Modal,
    Pressable,
    StyleSheet,
    Animated,
} from "react-native";

/* ---------------- TYPES ---------------- */

type DeliveryOption = "self" | "delivery";

type OrderItem = {
    name: string;
    qty: number;
    price: number;
};

type Order = {
    items: OrderItem[];
    total: number;
};

type DeliverySelectionProps = {
    visible: boolean;
    order: Order | null;
    distance: number; // in km
    onConfirm: (option: DeliveryOption, finalTotal: number) => void;
    onClose: () => void;
};

/* ---------------- COMPONENT ---------------- */

export default function DeliverySelection({
    visible,
    order,
    distance,
    onConfirm,
    onClose,
}: DeliverySelectionProps) {
    const [selectedOption, setSelectedOption] =
        useState<DeliveryOption>("self");

    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start();
        } else {
            slideAnim.setValue(300);
            setSelectedOption("self");
        }
    }, [visible]);

    if (!order) return null;

    const subtotal = order.total;
    const tax = subtotal * 0.05;
    const baseTotal = subtotal + tax;

    const deliveryCharge =
        selectedOption === "delivery" ? Math.max(distance * 10, 30) : 0;

    const finalTotal = baseTotal + deliveryCharge;

    const handleConfirm = () => {
        onConfirm(selectedOption, finalTotal);
    };

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.container,
                        { transform: [{ translateY: slideAnim }] },
                    ]}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Delivery Options</Text>
                        <Text style={styles.subtitle}>
                            Choose how you want to receive your order
                        </Text>
                    </View>

                    {/* Options */}
                    <View style={styles.optionsContainer}>
                        <Pressable
                            style={[
                                styles.optionCard,
                                selectedOption === "self" && styles.optionSelected,
                            ]}
                            onPress={() => setSelectedOption("self")}
                        >
                            <Text style={styles.optionTitle}>🚶 Self Pickup</Text>
                            <Text style={styles.optionDesc}>
                                Pick up from restaurant
                            </Text>
                            <Text style={styles.optionCharge}>₹0</Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.optionCard,
                                selectedOption === "delivery" && styles.optionSelected,
                            ]}
                            onPress={() => setSelectedOption("delivery")}
                        >
                            <Text style={styles.optionTitle}>🛵 Home Delivery</Text>
                            <Text style={styles.optionDesc}>
                                Delivery (~{distance} km)
                            </Text>
                            <Text style={styles.optionCharge}>
                                ₹{deliveryCharge}
                            </Text>
                        </Pressable>
                    </View>

                    {/* Summary */}
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text>Order Total</Text>
                            <Text>₹{baseTotal.toFixed(2)}</Text>
                        </View>

                        {selectedOption === "delivery" && (
                            <View style={styles.summaryRow}>
                                <Text>Delivery Charge</Text>
                                <Text>₹{deliveryCharge.toFixed(2)}</Text>
                            </View>
                        )}

                        <View style={styles.divider} />

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Amount to Pay</Text>
                            <Text style={styles.totalAmount}>
                                ₹{finalTotal.toFixed(2)}
                            </Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonGroup}>
                        <Pressable style={styles.secondaryBtn} onPress={onClose}>
                            <Text style={styles.secondaryBtnText}>Back</Text>
                        </Pressable>

                        <Pressable style={styles.primaryBtn} onPress={handleConfirm}>
                            <Text style={styles.primaryBtnText}>Confirm & Pay →</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "flex-end",
    },
    container: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    header: {
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    subtitle: {
        fontSize: 13,
        color: "#6b7280",
    },
    optionsContainer: {
        marginVertical: 12,
    },
    optionCard: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
    },
    optionSelected: {
        borderColor: "#22c55e",
        backgroundColor: "#f0fdf4",
    },
    optionTitle: {
        fontSize: 15,
        fontWeight: "600",
    },
    optionDesc: {
        fontSize: 12,
        color: "#6b7280",
    },
    optionCharge: {
        marginTop: 4,
        fontWeight: "600",
    },
    summaryContainer: {
        marginTop: 8,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },
    divider: {
        height: 1,
        backgroundColor: "#e5e7eb",
        marginVertical: 10,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "600",
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: "700",
    },
    buttonGroup: {
        flexDirection: "row",
        gap: 10,
        marginTop: 16,
    },
    secondaryBtn: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        backgroundColor: "#f3f4f6",
        alignItems: "center",
    },
    secondaryBtnText: {
        fontWeight: "600",
    },
    primaryBtn: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        backgroundColor: "#22c55e",
        alignItems: "center",
    },
    primaryBtnText: {
        color: "#fff",
        fontWeight: "700",
    },
});