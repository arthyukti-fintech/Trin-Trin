import { OrderPlace } from "@/app/types/order";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");


interface Props {
    order: OrderPlace;
    onClose: () => void;
}

const OrderLiveCard: React.FC<Props> = ({ order, onClose }) => {

    const calculateTotal = () => {
        return order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "confirmed":
                return "#4CAF50";
            case "preparing":
                return "#FF9800";
            case "delivered":
                return "#2196F3";
            case "cancelled":
                return "#F44336";
            default:
                return "#9E9E9E";
        }
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.card}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>🎉 Order Confirmed</Text>
                    <View
                        style={[
                            styles.statusBadge,
                            { backgroundColor: getStatusColor(order.status) },
                        ]}
                    >
                        <Text style={styles.statusText}>
                            {order.status.toUpperCase()}
                        </Text>
                    </View>
                </View>

                {/* Order ID */}
                <Text style={styles.orderId}>
                    Order ID: {order._id.slice(-6).toUpperCase()}
                </Text>

                {/* Items List */}
                <Text style={styles.sectionTitle}>Items</Text>

                <FlatList
                    data={order.items}
                    keyExtractor={(item) => item._id}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={styles.itemRow}>
                            <Text style={styles.itemName}>
                                {item.itemName} x{item.quantity}
                            </Text>
                            <Text style={styles.itemPrice}>
                                ₹ {item.price * item.quantity}
                            </Text>
                        </View>
                    )}
                />

                {/* Divider */}
                <View style={styles.divider} />

                {/* Total */}
                <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Total Amount</Text>
                    <Text style={styles.totalAmount}>
                        ₹ {calculateTotal()}
                    </Text>
                </View>

                {/* Time Info */}
                <Text style={styles.timeText}>
                    Ordered At:{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                </Text>

                {/* Close Button */}
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                >
                    <Text style={styles.closeText}>Make Payment</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default OrderLiveCard;


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    card: {
        width: width * 0.9,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },
    statusText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    orderId: {
        marginTop: 8,
        fontSize: 13,
        color: "#666",
    },
    sectionTitle: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: "700",
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    itemName: {
        fontSize: 14,
        color: "#333",
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: "#E0E0E0",
        marginVertical: 15,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    totalText: {
        fontSize: 16,
        fontWeight: "700",
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: "700",
        color: "#4CAF50",
    },
    timeText: {
        marginTop: 10,
        fontSize: 12,
        color: "#777",
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#000",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    closeText: {
        color: "#fff",
        fontWeight: "600",
    },
});
