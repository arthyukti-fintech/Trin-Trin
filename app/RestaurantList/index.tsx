import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Colors, Spacing } from "../theme";
import { ScrollView } from "react-native-gesture-handler";
import CompactFoodHeader from "@/components/HomeHeader/HomeHeader";
import FoodHeading from "@/components/FoodHeading";
import RestaurantCard from "@/components/RestaurantCard";
import { useGetAllRestaurantsQuery } from "@/redux/services/resturantApi";

export default function Home() {
  const { data, isLoading, error, refetch } = useGetAllRestaurantsQuery();
  const router = useRouter();

  // ✅ CORRECT PATH
  const restaurants = data?.data?.restaurants || [];
 

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

  return (
    <View style={styles.container}>
      <CompactFoodHeader />

      <View style={styles.content}>
        <FoodHeading
          title="What are you craving today?"
          highlightWord="craving"
          subtitle="Freshly cooked food from nearby kitchens"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {restaurants.map((restaurant: any) => (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}

              name={restaurant.name}
              cuisine={restaurant.cuisine}

              /* 📍 Address (formatted) */
              address={`${restaurant.address.street}, ${restaurant.address.city}`}

              /* ⭐ Temporary rating (until backend provides it) */
              rating={4.2}
              totalRatings={120}

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
          ))}

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
    padding: Spacing.md,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accentSoft,
  },

  subtitle: {
    marginTop: Spacing.sm,
    color: Colors.muted,
  },

  scrollContent: {
    paddingBottom: 300, // ✅ VERY IMPORTANT
  },

  averageDeliveryTime: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.muted,
    fontWeight: "500",
  },
});
