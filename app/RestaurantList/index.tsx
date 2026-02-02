import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useState, useMemo } from "react";
import { useRouter } from "expo-router";
import { Colors, Spacing } from "../theme";
import { ScrollView } from "react-native-gesture-handler";
import CompactFoodHeader from "@/components/HomeHeader/HomeHeader";
import FoodHeading from "@/components/FoodHeading";
import { useGetAllRestaurantsQuery } from "@/redux/services/resturantApi";
import RestaurantFilters, { FilterType } from "@/components/RestaurantFilters/RestaurantFilters";
import VegToggleModal from "@/components/VegToggleModal/VegToggleModal";
import RestaurantCard from "@/components/RestaurantCard";

export default function Home() {
  const { data, isLoading, error, refetch } = useGetAllRestaurantsQuery();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [showVegModal, setShowVegModal] = useState(false);
  const [pendingVegState, setPendingVegState] = useState(false);

  // ✅ CORRECT PATH
  const restaurants = data?.data?.restaurants || [];

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
    <View style={styles.container}>
      <CompactFoodHeader />

      <View style={styles.content}>
       
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

                /* 📍 Address (formatted) */
                address={`${restaurant.address.street}, ${restaurant.address.city}`}

                /* ⭐ Temporary rating (until backend provides it) */
                rating={restaurant.rating || 4.2}
                totalRatings={restaurant.totalRatings || 120}

                /* ⏱ Delivery */
                deliveryTime={`${restaurant.averageDeliveryTime} min`}
                averageDeliveryTime={restaurant.averageDeliveryTime}

                /* 📏 Distance (mock for now) */
                distance="2.5 km"

                /* 🥗 Veg */
                isVeg={restaurant.isVegOnly}

                /* 💰 Price */
                priceForTwo={restaurant.priceForTwo}

                /* 🖼 Images */
                images={[
                  restaurant.images?.exterior,
                  restaurant.images?.interior,
                  restaurant.images?.menuCard,
                ].filter(Boolean)}

                /* 📞 Actions */
                onCall={() => console.log("Calling:", restaurant.phoneNumber)}
              />
            ))
          )}
        </ScrollView>
      </View>

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
  container: {
    flex: 1,
    backgroundColor: Colors.accentSoft,
  },

  content: {
    flex: 1,
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
});