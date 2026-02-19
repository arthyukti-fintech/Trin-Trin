// components/Home/RestaurantOwnerHome.tsx
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import CompactFoodHeader from "@/components/HomeHeader/HomeHeader";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing } from "@/app/theme";
import { useGetOrdersQuery } from "@/redux/services/getordersApi";
import { useLocalSearchParams } from "expo-router";
import { useGetMyProfileQuery } from "@/redux/services/profileApi";




type OrderStatus = 'confirmed' | 'pending' | 'preparing' | 'ready' | 'delivered';


export default function RestaurantOwnerHome({ profileData }: any) {
  const [selectedTab, setSelectedTab] = useState<'all' | OrderStatus>('all');
  // const [orders] = useState(MOCK_ORDERS);
  const { restaurantId, restaurantName } = useLocalSearchParams();
 const { data, isLoading, error } = useGetOrdersQuery(restaurantId as string);

  const {data:profiledata, isLoading:profileLoading, error:profileError} = useGetMyProfileQuery();



const orders = data?.data?.orderList || [];



  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return Colors.warning;
      //   case 'preparing': return Colors.info;
      case 'ready': return Colors.success;
      case 'delivered': return Colors.muted;
      default: return Colors.muted;
    }
  };

  const filteredOrders = selectedTab === 'all'
    ? orders
    : orders.filter(order => order.status === selectedTab);

  const getStatusCount = (status: OrderStatus) => {
    return orders.filter(order => order.status === status).length;
  };

  return (
    <View style={styles.container}>
      <CompactFoodHeader profileData={profiledata} />

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Orders — {restaurantName}</Text>
        {/* <Text style={styles.subtitle}>Manage your orders and restaurant</Text> */}

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{orders.length}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{getStatusCount('pending')}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{getStatusCount('preparing')}</Text>
            <Text style={styles.statLabel}>Preparing</Text>
          </View>
        </View>


        {/* Orders List */}
        <ScrollView style={styles.ordersList}>
          {orders.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={64} color={Colors.muted} />
              <Text style={styles.emptyText}>No orders found</Text>
              <Text style={styles.emptySubText}>
                Orders will appear here when customers place them
              </Text>
            </View>
          ) : (
            orders.map((order: any) => {
              console.log("Items:", order.items);
              const totalAmount = order.items?.reduce(
                (sum: number, item: any) =>
                  sum + item.price * item.quantity,
                0
              );


              const itemsText = order.items
                ?.map((item: any) => `${item.quantity}x ${item.itemName}`)
                .join(", ");


              return (
                <View key={order._id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderNumber}>
                      #{order._id.slice(-6).toUpperCase()}
                    </Text>

                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: Colors.success },
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {order.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.orderDetails}>
                    <View style={styles.detailRow}>
                      <Ionicons name="restaurant-outline" size={16} color={Colors.muted} />
                      <Text style={styles.detailText}>{itemsText}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Ionicons name="time-outline" size={16} color={Colors.muted} />
                      <Text style={styles.detailText}>
                        {new Date(order.createdAt).toLocaleString()}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.orderFooter}>
                    <Text style={styles.orderTotal}>₹{totalAmount}</Text>

                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() =>
                          router.push({
                            pathname: "/OrderDetails",
                           params: { order: JSON.stringify(order) }
                          })

                        }
                      >
                        <Text style={styles.viewButtonText}>View Details</Text>
                      </TouchableOpacity>


                    </View>
                  </View>
                </View>
              );
            })
          )}

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentSoft,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.secondary,
    paddingVertical: Spacing.md
  },
  subtitle: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.muted,
    marginTop: 4,
  },
  tabContainer: {
    marginBottom: Spacing.md,
  },
  tab: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.white,
  },
  ordersList: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  orderDetails: {
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: Colors.muted,
    marginLeft: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: Colors.success,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  acceptButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 12,
  },
  readyButton: {
    // backgroundColor: Colors.info,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  readyButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 12,
  },
  viewButton: {
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: 8,
  },
});