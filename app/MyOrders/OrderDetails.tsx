import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import BackHeader from "@/components/BackHeader";
import { Colors } from "../theme";
import { useGetSingleOrderQuery } from "@/redux/services/getordersApi";

// ── Types ─────────────────────────────────────────────────────────────────────

interface OrderItem {
    _id: string;
    item: string;
    itemName: string;
    quantity: number;
    price: number;
}

interface DeliveryAddress {
    coordinates: { latitude: number; longitude: number };
    street: string;
    city: string;
    zipCode: string;
}

interface Restaurant {
    _id: string;
    name: string;
    cuisine: string;
    rating: number;
    averageDeliveryTime: string;
    isVegOnly: boolean;
    address: { street: string; city: string; state: string; pincode: string };
}

interface Order {
    orderId: string;
    orderNumber: string;
    status: string;
    preparationStatus: string;
    statusMessage: string;
    progressPercentage: number;
    isInProgress: boolean;
    canCancel: boolean;
    restaurant: Restaurant;
    deliveryAddress: DeliveryAddress;
    items: OrderItem[];
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    specialInstructions: string;
    orderDate: string;
    estimatedDeliveryTime: string;
    actualDeliveryTime: string;
    completedAt: string;
}

interface ApiResponse {
    statusCode: number;
    data: { order: Order };
    message: string;
}

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
    completed: { color: "#16A34A", bg: "#F0FDF4", label: "Completed" },
    cancelled: { color: "#DC2626", bg: "#FEF2F2", label: "Cancelled" },
    confirmed: { color: "#D97706", bg: "#FEF9EE", label: "Confirmed" },
    preparing: { color: "#7C3AED", bg: "#F5F3FF", label: "Preparing" },
    on_the_way: { color: "#2563EB", bg: "#EFF6FF", label: "On the Way" },
    delivered: { color: "#16A34A", bg: "#F0FDF4", label: "Delivered" },
    pending: { color: "#EF4444", bg: "#FEF2F2", label: "Pending" },
    paid: { color: "#16A34A", bg: "#F0FDF4", label: "Paid" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const fmtTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

// ── Main Component ────────────────────────────────────────────────────────────

export default function OrderDetails() {
    const { orderId } = useLocalSearchParams<{ orderId: string }>();
    const { data, isLoading, error } = useGetSingleOrderQuery(orderId as string) as {
        data: ApiResponse | undefined;
        isLoading: boolean;
        error: unknown;
    };

    const order = data?.data?.order;

    if (isLoading) {
        return (
            <View style={styles.container}>
                <BackHeader title="Order Details" iconColor="black" backTo="/MyOrders" />
                <View style={styles.centerState}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={styles.stateText}>Loading order details…</Text>
                </View>
            </View>
        );
    }

    if (error || !order) {
        return (
            <View style={styles.container}>
                <BackHeader title="Order Details" iconColor="black" backTo="/MyOrders" />
                <View style={styles.centerState}>
                    <Text style={styles.stateIcon}>⚠️</Text>
                    <Text style={styles.stateTitle}>Order not found</Text>
                    <Text style={styles.stateText}>We couldn't load this order. Please try again.</Text>
                </View>
            </View>
        );
    }

    const statusCfg = STATUS_CONFIG[order.status] ?? { color: "#6B7280", bg: "#F9FAFB", label: order.status };
    const paymentCfg = STATUS_CONFIG[order.paymentStatus] ?? { color: "#6B7280", bg: "#F9FAFB", label: order.paymentStatus };

    const itemsTotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const deliveryFee = order.totalAmount - itemsTotal;

    return (
        <View style={styles.container}>
            <BackHeader title="Order Details" iconColor="black" backTo="/MyOrders" />

            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* ── Hero ─────────────────────────────────────────────────────── */}
                <View style={styles.heroCard}>
                    <View style={[styles.heroStrip, { backgroundColor: statusCfg.color }]} />
                    <View style={styles.heroBody}>

                        {/* Order # + status pill */}
                        <View style={styles.heroTop}>
                            <View>
                                <Text style={styles.heroOrderNum}>#{order.orderNumber}</Text>
                                <Text style={styles.heroRestaurant}>{order.restaurant?.name}</Text>
                            </View>
                            <View style={[styles.pill, { backgroundColor: statusCfg.bg }]}>
                                <Text style={[styles.pillText, { color: statusCfg.color }]}>{statusCfg.label}</Text>
                            </View>
                        </View>

                        {/* Status message */}
                        <Text style={styles.statusMsg}>{order.statusMessage}</Text>

                        {/* Progress bar */}
                        <View style={styles.progressRow}>
                            <View style={styles.progressTrack}>
                                <View style={[styles.progressFill, {
                                    width: `${order.progressPercentage}%` as any,
                                    backgroundColor: statusCfg.color,
                                }]} />
                            </View>
                            <Text style={[styles.progressPct, { color: statusCfg.color }]}>
                                {order.progressPercentage}%
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        {/* Dates */}
                        <View style={styles.dateRow}>
                            <View style={styles.dateBlock}>
                                <Text style={styles.dateLabel}>Ordered</Text>
                                <Text style={styles.dateValue}>{fmtDate(order.orderDate)}</Text>
                                <Text style={styles.dateTime}>{fmtTime(order.orderDate)}</Text>
                            </View>
                            <View style={styles.dateSep} />
                            <View style={styles.dateBlock}>
                                <Text style={styles.dateLabel}>Delivered</Text>
                                <Text style={styles.dateValue}>{fmtDate(order.actualDeliveryTime)}</Text>
                                <Text style={styles.dateTime}>{fmtTime(order.actualDeliveryTime)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ── Restaurant Info ──────────────────────────────────────────── */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Restaurant</Text>
                    <View style={styles.restaurantRow}>
                        <View style={styles.restaurantInfo}>
                            <Text style={styles.restaurantName}>{order.restaurant?.name}</Text>
                            <Text style={styles.restaurantMeta}>
                                {order.restaurant?.cuisine}  ·  ⭐ {order.restaurant?.rating}  ·  ~{order.restaurant?.averageDeliveryTime} min
                            </Text>
                            <Text style={styles.restaurantAddress}>
                                {order.restaurant?.address?.street}, {order.restaurant?.address?.city}, {order.restaurant?.address?.state}
                            </Text>
                        </View>
                        {order.restaurant?.isVegOnly && (
                            <View style={styles.vegBadge}>
                                <Text style={styles.vegBadgeText}>🌿 Veg</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* ── Items + Bill ─────────────────────────────────────────────── */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Items Ordered</Text>

                    {order.items.map((item, idx) => (
                        <View
                            key={item._id}
                            style={[styles.itemRow, idx < order.items.length - 1 && styles.itemBorder]}
                        >
                            <View style={styles.itemLeft}>
                                <View style={styles.qtyBadge}>
                                    <Text style={styles.qtyText}>{item.quantity}</Text>
                                </View>
                                <Text style={styles.itemName}>{item.itemName}</Text>
                            </View>
                            <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
                        </View>
                    ))}

                    <View style={styles.divider} />

                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Subtotal</Text>
                        <Text style={styles.billValue}>₹{itemsTotal}</Text>
                    </View>
                    {deliveryFee > 0 && (
                        <View style={styles.billRow}>
                            <Text style={styles.billLabel}>Delivery Fee</Text>
                            <Text style={styles.billValue}>₹{deliveryFee}</Text>
                        </View>
                    )}
                    <View style={[styles.billRow, styles.billTotalRow]}>
                        <Text style={styles.billTotalLabel}>Total Paid</Text>
                        <Text style={styles.billTotalValue}>₹{order.totalAmount}</Text>
                    </View>
                </View>

                {/* ── Payment ──────────────────────────────────────────────────── */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Payment</Text>
                    <View style={styles.paymentRow}>
                        <View>
                            <Text style={styles.paymentMethod}>{order.paymentMethod?.toUpperCase()}</Text>
                            <Text style={styles.paymentSub}>Payment method</Text>
                        </View>
                        <View style={[styles.pill, { backgroundColor: paymentCfg.bg }]}>
                            <Text style={[styles.pillText, { color: paymentCfg.color }]}>{paymentCfg.label}</Text>
                        </View>
                    </View>
                </View>

                {/* ── Delivery Address ─────────────────────────────────────────── */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Delivery Address</Text>
                    <View style={styles.addressRow}>
                        <Text style={styles.addressIcon}>📍</Text>
                        <View>
                            <Text style={styles.addressStreet}>{order.deliveryAddress?.street}</Text>
                            <Text style={styles.addressSub}>
                                {order.deliveryAddress?.city} — {order.deliveryAddress?.zipCode}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* ── Special Instructions ─────────────────────────────────────── */}
                {!!order.specialInstructions && (
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Special Instructions</Text>
                        <View style={styles.instructionBox}>
                            <Text style={styles.instructionText}>"{order.specialInstructions}"</Text>
                        </View>
                    </View>
                )}

                <View style={{ height: 32 }} />
            </ScrollView>
        </View>
    );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.accentSoft,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 14,
        gap: 12,
        flexGrow: 1,
    },

    // ── Hero ──────────────────────────────────────────────────────────────────
    heroCard: {
        backgroundColor: Colors.background,
        borderRadius: 14,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    heroStrip: {
        height: 5,
    },
    heroBody: {
        padding: 16,
    },
    heroTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 6,
    },
    heroOrderNum: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
        letterSpacing: 0.3,
    },
    heroRestaurant: {
        fontSize: 13,
        color: Colors.muted,
        marginTop: 2,
        fontWeight: "500",
    },
    statusMsg: {
        fontSize: 13,
        color: Colors.muted,
        marginBottom: 12,
    },
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 14,
    },
    progressTrack: {
        flex: 1,
        height: 6,
        backgroundColor: "#F3F4F6",
        borderRadius: 10,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 10,
    },
    progressPct: {
        fontSize: 12,
        fontWeight: "700",
        minWidth: 36,
        textAlign: "right",
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    dateBlock: {
        flex: 1,
    },
    dateSep: {
        width: 1,
        height: 40,
        backgroundColor: "#E5E7EB",
        marginHorizontal: 16,
    },
    dateLabel: {
        fontSize: 11,
        color: Colors.muted,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        fontWeight: "600",
        marginBottom: 3,
    },
    dateValue: {
        fontSize: 13,
        fontWeight: "700",
        color: "#111827",
    },
    dateTime: {
        fontSize: 12,
        color: Colors.muted,
        marginTop: 1,
    },

    // ── Generic card ──────────────────────────────────────────────────────────
    card: {
        backgroundColor: Colors.background,
        borderRadius: 14,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.muted,
        textTransform: "uppercase",
        letterSpacing: 0.7,
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginVertical: 10,
    },

    // ── Pill ──────────────────────────────────────────────────────────────────
    pill: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    pillText: {
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 0.2,
    },

    // ── Restaurant ────────────────────────────────────────────────────────────
    restaurantRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    restaurantInfo: {
        flex: 1,
        marginRight: 8,
    },
    restaurantName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 3,
    },
    restaurantMeta: {
        fontSize: 12,
        color: Colors.muted,
        marginBottom: 4,
    },
    restaurantAddress: {
        fontSize: 12,
        color: Colors.muted,
    },
    vegBadge: {
        backgroundColor: "#F0FDF4",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    vegBadgeText: {
        fontSize: 11,
        color: "#16A34A",
        fontWeight: "600",
    },

    // ── Items ─────────────────────────────────────────────────────────────────
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
    },
    qtyBadge: {
        width: 26,
        height: 26,
        borderRadius: 8,
        backgroundColor: Colors.primary + "18",
        alignItems: "center",
        justifyContent: "center",
    },
    qtyText: {
        fontSize: 12,
        fontWeight: "800",
        color: Colors.primary,
    },
    itemName: {
        fontSize: 14,
        color: "#1F2937",
        fontWeight: "500",
        flex: 1,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
    },

    // ── Bill ──────────────────────────────────────────────────────────────────
    billRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    billLabel: {
        fontSize: 13,
        color: Colors.muted,
    },
    billValue: {
        fontSize: 13,
        color: "#374151",
        fontWeight: "500",
    },
    billTotalRow: {
        marginTop: 4,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
    },
    billTotalLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },
    billTotalValue: {
        fontSize: 16,
        fontWeight: "800",
        color: Colors.primary,
    },

    // ── Payment ───────────────────────────────────────────────────────────────
    paymentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    paymentMethod: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },
    paymentSub: {
        fontSize: 12,
        color: Colors.muted,
        marginTop: 2,
    },

    // ── Address ───────────────────────────────────────────────────────────────
    addressRow: {
        flexDirection: "row",
        gap: 10,
        alignItems: "flex-start",
    },
    addressIcon: {
        fontSize: 18,
        marginTop: 1,
    },
    addressStreet: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1F2937",
    },
    addressSub: {
        fontSize: 12,
        color: Colors.muted,
        marginTop: 3,
    },

    // ── Instructions ──────────────────────────────────────────────────────────
    instructionBox: {
        backgroundColor: Colors.accentSoft,
        borderRadius: 10,
        padding: 12,
    },
    instructionText: {
        fontSize: 13,
        color: "#374151",
        fontStyle: "italic",
        lineHeight: 20,
    },

    // ── States ────────────────────────────────────────────────────────────────
    centerState: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    stateIcon: {
        fontSize: 48,
        marginBottom: 14,
    },
    stateTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 6,
    },
    stateText: {
        fontSize: 13,
        color: Colors.muted,
        textAlign: "center",
        lineHeight: 20,
        marginTop: 8,
    },
});