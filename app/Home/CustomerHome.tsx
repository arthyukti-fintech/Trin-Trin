// components/Home/CustomerHome.tsx
import { View, StyleSheet, Text, ActivityIndicator, Modal } from "react-native";
import { useState, useMemo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CompactFoodHeader from "@/components/HomeHeader/HomeHeader";
import FoodHeading from "@/components/FoodHeading";
import { useGetAllRestaurantsQuery } from "@/redux/services/resturantApi";
import RestaurantFilters, { FilterType } from "@/components/RestaurantFilters/RestaurantFilters";
import VegToggleModal from "@/components/VegToggleModal/VegToggleModal";
import RestaurantCard from "@/components/RestaurantCard";
import { Colors, Spacing } from "@/app/theme";
import { useOrderSocket } from "../socket/hooks/useOrderSocket";
import OrderLiveCard from "@/components/order/OrderLiveCard";
import { Order } from "../types";
import { OrderPlace } from "../types/order";

export default function CustomerHome() {
  const { data, isLoading, error, refetch } = useGetAllRestaurantsQuery();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [showVegModal, setShowVegModal] = useState(false);
  const [pendingVegState, setPendingVegState] = useState(false);

  const [order, setOrder] = useState<OrderPlace | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const restaurants = data?.data?.restaurants || [];

  useOrderSocket((incomingOrder) => {
    console.log("Order received:", incomingOrder);
    setOrder(incomingOrder);
    setModalVisible(true);   // 🔥 THIS WAS MISSING
  });

  // Handle Veg Toggle with confirmation
  const handleVegToggleRequest = (value: boolean) => {
    setPendingVegState(value);
    setShowVegModal(true);
  };

  const handleVegToggleConfirm = () => {
    setIsVegOnly(pendingVegState);
    setShowVegModal(false);
  };

  const handleVegToggleCancel = () => {
    setShowVegModal(false);
  };

  // 🔍 Filter Logic
  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;

    // Apply Veg Only filter first
    if (isVegOnly) {
      filtered = filtered.filter((restaurant: any) => restaurant.isVegOnly === true);
    }

    // Apply regular filters
    if (selectedFilter !== 'all') {
      filtered = filtered.filter((restaurant: any) => {
        switch (selectedFilter) {
          case 'freeDelivery':
            return restaurant.deliveryFee === 0 || restaurant.freeDelivery === true;

          case 'cloudKitchen':
            return restaurant.isCloudKitchen === true || restaurant.type === 'cloud';

          case 'fastDelivery':
            return parseInt(restaurant.averageDeliveryTime) <= 30;

          case 'topRated':
            return restaurant.rating >= 4.0;

          case 'newlyOpened':
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return new Date(restaurant.createdAt) > thirtyDaysAgo;

          default:
            return true;
        }
      });
    }

    return filtered;
  }, [restaurants, selectedFilter, isVegOnly]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Failed to load restaurants</Text>
        <Text onPress={refetch} style={{ marginTop: 10, color: Colors.primary }}>
          Retry
        </Text>
      </View>
    );
  }

  const hasActiveFilters = selectedFilter !== 'all' || isVegOnly;

  return (
    <View style={styles.content}>
      <CompactFoodHeader />
      <Modal visible={modalVisible} transparent animationType="fade">
        {order && (
          <OrderLiveCard
            order={order}
            onClose={() => setModalVisible(false)}
          />
        )}

      </Modal>


      {/* <FoodHeading
        title="What are you craving ?"
        highlightWord="craving"
        subtitle="Freshly cooked food from nearby kitchens"
      /> */}

      {/* 🎯 Filter Section with Veg Toggle */}
      <RestaurantFilters
        selectedFilter={selectedFilter}
        isVegOnly={isVegOnly}
        onFilterChange={setSelectedFilter}
        onVegToggle={handleVegToggleRequest}
      />

      {/* 📊 Results Counter */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} found
        </Text>
        {hasActiveFilters && (
          <Text
            style={styles.clearFilter}
            onPress={() => {
              setSelectedFilter('all');
              setIsVegOnly(false);
            }}
          >
            Clear all filters
          </Text>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredRestaurants.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No restaurants found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your filters or check back later
            </Text>
            <Text
              style={styles.emptyButton}
              onPress={() => {
                setSelectedFilter('all');
                setIsVegOnly(false);
              }}
            >
              View all restaurants
            </Text>
          </View>
        ) : (
          filteredRestaurants.map((restaurant: any) => (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              name={restaurant.name}
              cuisine={restaurant.cuisine}
              address={`${restaurant.address.street}, ${restaurant.address.city}`}
              rating={restaurant.rating || 4.2}
              totalRatings={restaurant.totalRatings || 120}
              deliveryTime={`${restaurant.averageDeliveryTime} min`}
              averageDeliveryTime={restaurant.averageDeliveryTime}
              distance="2.5 km"
              isVeg={restaurant.isVegOnly}
              priceForTwo={restaurant.priceForTwo}
              images={[
                restaurant.images?.exterior,
                restaurant.images?.interior,
                restaurant.images?.menuCard,
              ].filter(Boolean)}

            />
          ))
        )}
      </ScrollView>

      {/* Veg Toggle Confirmation Modal */}
      <VegToggleModal
        visible={showVegModal}
        isVegOnly={pendingVegState}
        onConfirm={handleVegToggleConfirm}
        onCancel={handleVegToggleCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.accentSoft,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accentSoft,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  resultsText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.muted,
  },
  clearFilter: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primarySoft,
    borderRadius: 8,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 50,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  status: {
    marginTop: 10,
    fontWeight: "600",
  },
  closeBtn: {
    marginTop: 15,
    textAlign: "center",
    color: "red",
    fontWeight: "600",
  },
});