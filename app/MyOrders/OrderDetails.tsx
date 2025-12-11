import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BackHeader from "@/components/BackHeader";
import { orderData, Order } from "./index";
import { Colors } from "../theme";

export default function OrderDetails() {
    const { orderId } = useLocalSearchParams<{ orderId: string }>();

    const order: Order | undefined = orderData.find((o) => o.id === orderId);

    if (!order) {
        return (
            <SafeAreaView>
                <Text>Order not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader title="Order Details" iconColor="black" backTo="/MyOrders" />

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 🔥 WHITE CARD */}
                <View style={styles.card}>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <Text style={styles.sub}>{order.date} at {order.time}</Text>

                    <Text style={styles.section}>Restaurant</Text>
                    <Text>{order.restaurant}</Text>

                    <Text style={styles.section}>Delivery Address</Text>
                    <Text>{order.deliveryAddress}</Text>

                    <Text style={styles.section}>Items</Text>
                    {order.items.map((i, idx) => (
                        <View key={idx} style={styles.itemRow}>
                            <Text>{i.quantity}× {i.name}</Text>
                            <Text>₹{i.price}</Text>
                        </View>
                    ))}

                    <Text style={styles.section}>Total</Text>
                    <Text style={styles.total}>₹{order.total}</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.accentSoft
    },

    // NEW white card wrapper
    card: {
        backgroundColor: Colors.background,
        margin: 20,
        padding: 20,
        borderRadius: 16,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,

    },

    orderId: { fontSize: 22, fontWeight: "700" },
    sub: { color: Colors.muted, marginBottom: 16 },

    section: { marginTop: 20, fontSize: 18, fontWeight: "700" },

    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 6
    },

    total: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 10
    }
});
