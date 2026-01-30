import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    Animated,
} from "react-native";

type OrderItem = {
    name: string;
    qty: number;
    price: number;
};

type Props = {
    visible: boolean;
    order: {
        items: OrderItem[];
        total: number;
    } | null;
    onConfirm: () => void;
};

export default function OrderPopup({ visible, order, onConfirm }: Props) {
    const slideAnim = React.useRef(new Animated.Value(300)).current;

    React.useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start();
        }
    }, [visible]);

    if (!order) return null;

    const subtotal = order.total;
    const tax = subtotal * 0.05; // 5% tax
    const finalTotal = subtotal + tax;

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
                        <Text style={styles.title}>Your Bill</Text>
                        <Text style={styles.subtitle}>
                            Review your order details
                        </Text>
                    </View>

                    {/* Items List */}
                    <View style={styles.itemsContainer}>
                        <FlatList
                            data={order.items}
                            keyExtractor={(_, i) => i.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.itemRow}>
                                    <View style={styles.itemLeft}>
                                        <Text style={styles.itemName}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.itemQty}>
                                            Qty: {item.qty}
                                        </Text>
                                    </View>
                                    <Text style={styles.itemPrice}>
                                        ₹{item.price.toFixed(2)}
                                    </Text>
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                            style={styles.itemsList}
                        />
                    </View>

                    {/* Bill Summary */}
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>
                                ₹{subtotal.toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tax (5%)</Text>
                            <Text style={styles.summaryValue}>
                                ₹{tax.toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalAmount}>
                                ₹{finalTotal.toFixed(2)}
                            </Text>
                        </View>
                    </View>

                    {/* Action Button */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.confirmBtn,
                            pressed && styles.confirmBtnPressed,
                        ]}
                        onPress={onConfirm}
                    >
                        <Text style={styles.confirmText}>Proceed to Pay</Text>
                        <Text style={styles.confirmArrow}>→</Text>
                    </Pressable>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    container: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 24,
        maxHeight: "80%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
    },
    itemsContainer: {
        maxHeight: 240,
    },
    itemsList: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f5f5f5",
    },
    itemLeft: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    itemQty: {
        fontSize: 13,
        color: "#888",
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    summaryContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#f9f9f9",
        marginHorizontal: 20,
        borderRadius: 12,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: 14,
        color: "#666",
    },
    summaryValue: {
        fontSize: 14,
        color: "#1a1a1a",
        fontWeight: "500",
    },
    divider: {
        height: 1,
        backgroundColor: "#e0e0e0",
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    totalAmount: {
        fontSize: 22,
        fontWeight: "700",
        color: "#22c55e",
    },
    confirmBtn: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: "#22c55e",
        paddingVertical: 16,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#22c55e",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    confirmBtnPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
    },
    confirmText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
        marginRight: 8,
    },
    confirmArrow: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },
});