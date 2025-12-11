import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../theme';
import BackHeader from '@/components/BackHeader';

// Mock data - replace with your actual data source


const orderData: Order[] = [
  {
    id: '#ORD-2458',
    date: '2024-12-11',
    time: '2:30 PM',
    status: 'delivered',
    items: [
      { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
      { name: 'Caesar Salad', quantity: 1, price: 8.99 },
      { name: 'Garlic Bread', quantity: 1, price: 4.99 }
    ],
    total: 39.96,
    restaurant: 'Pizza Palace',
    deliveryAddress: '123 Main St, Apt 4B'
  },
  {
    id: '#ORD-2457',
    date: '2024-12-10',
    time: '7:15 PM',
    status: 'cancelled',
    items: [
      { name: 'Chicken Burger', quantity: 1, price: 9.99 },
      { name: 'French Fries', quantity: 1, price: 3.99 }
    ],
    total: 13.98,
    restaurant: 'Burger Hub',
    deliveryAddress: '123 Main St, Apt 4B'
  },
  {
    id: '#ORD-2456',
    date: '2024-12-09',
    time: '1:00 PM',
    status: 'processing',
    items: [
      { name: 'Pad Thai', quantity: 1, price: 11.99 },
      { name: 'Spring Rolls', quantity: 2, price: 5.99 },
      { name: 'Thai Iced Tea', quantity: 1, price: 3.99 }
    ],
    total: 21.97,
    restaurant: 'Thai Kitchen',
    deliveryAddress: '123 Main St, Apt 4B'
  },
  {
    id: '#ORD-2455',
    date: '2024-12-08',
    time: '6:45 PM',
    status: 'delivered',
    items: [
      { name: 'Sushi Platter', quantity: 1, price: 24.99 },
      { name: 'Miso Soup', quantity: 2, price: 4.99 }
    ],
    total: 29.98,
    restaurant: 'Sushi Master',
    deliveryAddress: '123 Main St, Apt 4B'
  }
];

type OrderStatus = 'delivered' | 'processing' | 'cancelled';
type TabType = 'all' | OrderStatus;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  time: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  restaurant: string;
  deliveryAddress: string;
}

function MyOrderScreen() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const getStatusConfig = (status: OrderStatus) => {
    switch(status) {
      case 'delivered':
        return { 
          color: Colors.success, 
          text: 'Delivered',
          bg: '#E8F5E9'
        };
      case 'processing':
        return { 
          color: Colors.warning, 
          text: 'Processing',
          bg: Colors.accentSoft
        };
      case 'cancelled':
        return { 
          color: Colors.error, 
          text: 'Cancelled',
          bg: Colors.primarySoft
        };
    }
  };

  const filterOrders = () => {
    if (activeTab === 'all') return orderData;
    return orderData.filter(order => order.status === activeTab);
  };

  const filteredOrders = filterOrders();

  if (selectedOrder) {
    const statusConfig = getStatusConfig(selectedOrder.status);

    return (
      <SafeAreaView style={styles.container}>
         <BackHeader iconColor='black'/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => setSelectedOrder(null)}
              style={styles.backButton}
            >
             
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Order Details</Text>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>{selectedOrder.id}</Text>
                <Text style={styles.orderDate}>{selectedOrder.date} at {selectedOrder.time}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                <Text style={[styles.statusText, { color: statusConfig.color }]}>
                  {statusConfig.text}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Restaurant</Text>
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantIcon}>🍽️</Text>
                <Text style={styles.restaurantName}>{selectedOrder.restaurant}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
              <Text style={styles.addressText}>{selectedOrder.deliveryAddress}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order Items</Text>
              {selectedOrder.items.map((item, index) => (
                <View key={index} style={styles.orderItem}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                    <Text style={styles.itemName}>{item.name}</Text>
                  </View>
                  <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
                </View>
              ))}
            </View>

            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>₹{(selectedOrder.total * 0.9).toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Delivery Fee</Text>
                <Text style={styles.totalValue}>₹{(selectedOrder.total * 0.1).toFixed(2)}</Text>
              </View>
              <View style={[styles.totalRow, styles.grandTotal]}>
                <Text style={styles.grandTotalLabel}>Total</Text>
                <Text style={styles.grandTotalValue}>₹{selectedOrder.total.toFixed(2)}</Text>
              </View>
            </View>

            {selectedOrder.status === 'delivered' && (
              <TouchableOpacity style={styles.reorderButton}>
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader iconColor='black'/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Orders</Text>
          <Text style={styles.headerSubtitle}>Track and manage your orders</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabContent}
        >
          {(['all', 'delivered', 'processing', 'cancelled'] as TabType[]).map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.ordersList}>
          {filteredOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📦</Text>
              <Text style={styles.emptyTitle}>No orders found</Text>
              <Text style={styles.emptyText}>You haven't placed any orders yet</Text>
            </View>
          ) : (
            filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              
              return (
                <TouchableOpacity 
                  key={order.id} 
                  style={styles.orderCard}
                  onPress={() => setSelectedOrder(order)}
                  activeOpacity={0.7}
                >
                  <View style={styles.orderCardHeader}>
                    <View>
                      <Text style={styles.orderCardId}>{order.id}</Text>
                      <Text style={styles.orderCardDate}>{order.date} at {order.time}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                      <Text style={[styles.statusText, { color: statusConfig.color }]}>
                        {statusConfig.text}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.orderCardBody}>
                    <View style={styles.restaurantRow}>
                      <Text style={styles.restaurantIcon}>🍽️</Text>
                      <Text style={styles.orderCardRestaurant}>{order.restaurant}</Text>
                    </View>
                    <Text style={styles.orderCardItems}>
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </Text>
                  </View>

                  <View style={styles.orderCardFooter}>
                    <Text style={styles.orderCardTotal}>₹{order.total.toFixed(2)}</Text>
                    <View style={styles.viewDetails}>
                      <Text style={styles.viewDetailsText}>View Details →</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentSoft,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.muted,
  },
  backButton: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  tabContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabContent: {
    gap: 8,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.muted,
  },
  activeTabText: {
    color: Colors.card,
  },
  ordersList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  orderCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderCardId: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 4,
  },
  orderCardDate: {
    fontSize: 13,
    color: Colors.muted,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderCardBody: {
    marginBottom: 16,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  restaurantIcon: {
    fontSize: 16,
  },
  orderCardRestaurant: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.secondary,
  },
  orderCardItems: {
    fontSize: 14,
    color: Colors.muted,
  },
  orderCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  orderCardTotal: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  viewDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    backgroundColor: Colors.card,
    borderRadius: 16,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.muted,
  },
  detailsCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    margin: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  orderId: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.muted,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 12,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.secondary,
  },
  addressText: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    minWidth: 30,
  },
  itemName: {
    fontSize: 15,
    color: Colors.secondary,
    flex: 1,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.secondary,
  },
  totalSection: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: Colors.border,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 14,
    color: Colors.muted,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
  },
  grandTotal: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
  },
  grandTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  reorderButton: {
    width: '100%',
    padding: 16,
    marginTop: 24,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: Colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MyOrderScreen;