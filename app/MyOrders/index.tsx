import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";

import BackHeader from "@/components/BackHeader";
import { useRouter } from "expo-router";
import { Colors } from "../theme";

// TYPES
export type OrderStatus = "delivered" | "processing" | "cancelled";
export type TabType = "all" | OrderStatus;

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  time: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  restaurant: string;
  deliveryAddress: string;
}

// MOCK DATA
export const orderData: Order[] = [
  {
    id: "#ORD-2458",
    date: "2024-12-11",
    time: "2:30 PM",
    status: "delivered",
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 12.99 },
      { name: "Caesar Salad", quantity: 1, price: 8.99 },
      { name: "Garlic Bread", quantity: 1, price: 4.99 }
    ],
    total: 39.96,
    restaurant: "Pizza Palace",
    deliveryAddress: "123 Main St, Apt 4B",
  },
  {
    id: "#ORD-2457",
    date: "2024-12-10",
    time: "7:15 PM",
    status: "cancelled",
    items: [
      { name: "Chicken Burger", quantity: 1, price: 9.99 },
      { name: "French Fries", quantity: 1, price: 3.99 }
    ],
    total: 13.98,
    restaurant: "Burger Hub",
    deliveryAddress: "123 Main St, Apt 4B",
  },
];

export default function MyOrders() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filterOrders = () => {
    return activeTab === "all"
      ? orderData
      : orderData.filter((o) => o.status === activeTab);
  };

  const filteredOrders = filterOrders();

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="My Orders" iconColor="black" backTo='/Profile' />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabContent}
        >
          {(["all", "delivered", "processing", "cancelled"] as TabType[]).map((t, index, arr) => (
            <TouchableOpacity
              key={t}
              onPress={() => setActiveTab(t)}
              style={[
                styles.tab,
                activeTab === t && styles.activeTab,

                // ⭐ Add equal left & right spacing
                index === 0 && { marginLeft: 20 },              // first tab spacing
                index === arr.length - 1 && { marginRight: 20 } // last tab spacing
              ]}
            >
              <Text style={[styles.tabText, activeTab === t && styles.activeTabText]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>


        {/* Order Cards */}
        <View style={styles.ordersList}>
          {filteredOrders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() =>
                router.push({
                  pathname: "/MyOrders/OrderDetails",
                  params: { orderId: order.id }
                })
              }
            >
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.date}>{order.date} at {order.time}</Text>
              <Text style={styles.restaurant}>{order.restaurant}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.total}>₹{order.total.toFixed(2)}</Text>
                <Text style={styles.total}>View Details</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.accentSoft },

  tabContainer: { marginBottom: 20 },

  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,  // spacing between tabs
  },

  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.card,
  },

  activeTab: { backgroundColor: Colors.primary },

  tabText: { fontSize: 14, color: Colors.muted },

  activeTabText: { color: Colors.card },

  ordersList: { paddingHorizontal: 20, gap: 16 },

  orderCard: { padding: 20, borderRadius: 10, backgroundColor: Colors.background },

  orderId: { fontSize: 18, fontWeight: "700" },

  date: { color: Colors.muted },

  restaurant: { fontWeight: "600", marginTop: 6 },

  total: { marginTop: 8, fontSize: 16, fontWeight: "700", color: Colors.primary }
});
