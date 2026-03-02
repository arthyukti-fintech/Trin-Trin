import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import BackHeader from "@/components/BackHeader";
import { useRouter } from "expo-router";
import { Colors } from "../theme";
import { useGetMyOrdersQuery } from "@/redux/services/getordersApi";

export type TabType = "all" | "completed" | "cancelled";

const TABS: { key: TabType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  completed: { color: "#16A34A", bg: "#F0FDF4", label: "Completed" },
  cancelled: { color: "#DC2626", bg: "#FEF2F2", label: "Cancelled" },
  confirmed: { color: "#D97706", bg: "#FEF9EE", label: "Confirmed" },
  preparing: { color: "#7C3AED", bg: "#F5F3FF", label: "Preparing" },
  on_the_way: { color: "#2563EB", bg: "#EFF6FF", label: "On the Way" },
};

// Match the shape returned by the API
interface OrderAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface OrderRestaurant {
  id: string;
  name: string;
  address: OrderAddress;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface MyOrder {
  orderId: string;
  orderNumber: string;
  restaurant: OrderRestaurant;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  preparationStatus?: string;
  statusMessage?: string;
  progressPercentage?: number;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  canCancel?: boolean;
  orderDate: string;
  completedAt?: string;
  isInProgress?: boolean;
}

interface ApiResponse {
  statusCode: number;
  data: {
    allOrderList: MyOrder[];
    inProgress: { count: number; orders: MyOrder[] };
    completed: { count: number; orders: MyOrder[] };
  };
  message: string;
}

export default function MyOrders() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const STATUS_MAP: Record<TabType, string | undefined> = {
    all: undefined,
    completed: "completed",
    cancelled: "cancelled",
  };

  // Cast the response so TS knows the shape
  const { data, isLoading, error } =
    useGetMyOrdersQuery(STATUS_MAP[activeTab]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const orders: MyOrder[] =
    data?.data?.allOrderList ?? [];

  return (
    <View style={styles.container}>
      <BackHeader title="My Orders" iconColor="black" backTo="/Profile" />

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScrollView}
        contentContainerStyle={styles.tabContent}
      >
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                styles.tab,
                isActive && styles.activeTab,
                index === 0 && { marginLeft: 20 },
                index === TABS.length - 1 && { marginRight: 20 },
              ]}
              activeOpacity={0.75}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Total Orders Count */}
      <Text style={styles.totalCount}>
        {orders.length} {orders.length === 1 ? "order" : "orders"}
      </Text>

      {/* Order List — flex:1 so it fills remaining space with the bg color */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {isLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.stateText}>Loading your orders…</Text>
          </View>
        ) : error ? (
          <View style={styles.centerState}>
            <Text style={styles.stateIcon}>⚠️</Text>
            <Text style={styles.stateTitle}>Something went wrong</Text>
            <Text style={styles.stateText}>Could not load orders. Please try again.</Text>
          </View>
        ) : orders.length === 0 ? (
          <View style={styles.centerState}>
            <Text style={styles.stateIcon}>🛍️</Text>
            <Text style={styles.stateTitle}>No orders here</Text>
            <Text style={styles.stateText}>
              {activeTab === "cancelled"
                ? "No cancelled orders"
                : "No completed orders yet"}
            </Text>
          </View>
        ) : (
          orders.map((order) => {
            const cfg = STATUS_CONFIG[order.status] ?? {
              color: "#6B7280",
              bg: "#F9FAFB",
              label: order.status,
            };
            const itemPreview = order.items
              ?.slice(0, 2)
              .map((i) => `${i.name} x${i.quantity}`)
              .join("  •  ");
            const extraItems = (order.items?.length ?? 0) - 2;

            return (
              <TouchableOpacity
                key={order.orderId}
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: "/MyOrders/OrderDetails",
                    params: { orderId: order.orderId },
                  })
                }
                activeOpacity={0.9}
              >
                {/* Left accent bar */}
                <View style={[styles.accentBar, { backgroundColor: cfg.color }]} />

                <View style={styles.cardInner}>
                  {/* Header */}
                  <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderLeft}>
                      <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
                      <Text style={styles.restaurantName}>{order.restaurant?.name}</Text>
                    </View>
                    <View style={[styles.statusPill, { backgroundColor: cfg.bg }]}>
                      <Text style={[styles.statusPillText, { color: cfg.color }]}>
                        {cfg.label}
                      </Text>
                    </View>
                  </View>

                  {/* Items */}
                  <Text style={styles.itemsText} numberOfLines={1}>
                    {itemPreview}
                    {extraItems > 0 ? `  +${extraItems} more` : ""}
                  </Text>

                  {/* Status Message */}
                  {!!order.statusMessage && (
                    <Text style={styles.statusMessage}>{order.statusMessage}</Text>
                  )}

                  <View style={styles.divider} />

                  {/* Footer */}
                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.totalAmount}>Rs.{order.totalAmount}</Text>
                      <Text style={styles.dateText}>
                        {formatDate(order.orderDate)} · {formatTime(order.orderDate)}
                      </Text>
                    </View>
                    <View style={styles.detailsBtn}>
                      <Text style={styles.detailsBtnText}>Details →</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentSoft, // fills the ENTIRE screen including below the list
  },

  // Tabs
  tabScrollView: {
    flexGrow: 0,
    marginTop: 14,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 2,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.muted,
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // Count
  totalCount: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 6,
    fontSize: 12,
    fontWeight: "600",
    color: Colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  // ScrollView must have flex:1 so its background (inherited from container) fills all space
  scrollView: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 32,
    gap: 10,
    flexGrow: 1, // ensures the content area stretches to fill even when list is short
  },

  // Card
  card: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  accentBar: {
    width: 4,
  },
  cardInner: {
    flex: 1,
    padding: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flex: 1,
    marginRight: 10,
  },
  orderNumber: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: 0.3,
  },
  restaurantName: {
    fontSize: 12,
    color: Colors.muted,
    marginTop: 2,
    fontWeight: "500",
  },
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  itemsText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 18,
    marginBottom: 4,
  },
  statusMessage: {
    fontSize: 12,
    color: Colors.muted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.3,
  },
  dateText: {
    fontSize: 11,
    color: Colors.muted,
    marginTop: 2,
  },
  detailsBtn: {
    backgroundColor: Colors.primary + "18",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 9,
  },
  detailsBtnText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },

  // States
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
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