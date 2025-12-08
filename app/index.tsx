import { View, FlatList, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import HomeHeader from "./components/HomeHeader";
import { Colors, Spacing, Typography } from "./theme";
import RestaurantCard from "./components/RestaurantCard";
import { ScrollView } from "react-native-gesture-handler";
import FoodHeading from "./components/FoodHeading";

export default function Home() {
    const router = useRouter();

    const restaurants = [
        {
            id: "1",
            name: "Pizza Palace",
            cuisine: "Italian, Fast Food, Pizza",
            address: "123 MG Road, Koramangala, Bangalore",
            rating: 4.5,
            totalRatings: 2500,
            deliveryTime: "30-35 min",
            distance: "2.5 km",
            priceForTwo: 400,
            discount: "50% OFF up to ₹100",
            isVeg: false,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
            isFavorite: false,
        },
        {
            id: "2",
            name: "Green Bowl Cafe",
            cuisine: "Healthy, Salads, Smoothies",
            address: "456 Indiranagar, Bangalore",
            rating: 4.7,
            totalRatings: 1800,
            deliveryTime: "25-30 min",
            distance: "1.8 km",
            priceForTwo: 350,
            discount: "30% OFF",
            isVeg: true,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
            isFavorite: true,
        },
        {
            id: "3",
            name: "Burger Bros",
            cuisine: "American, Burgers, Fast Food",
            address: "789 HSR Layout, Bangalore",
            rating: 4.3,
            totalRatings: 3200,
            deliveryTime: "20-25 min",
            distance: "3.1 km",
            priceForTwo: 500,
            discount: "Free Delivery",
            isVeg: false,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
            isFavorite: false,
        },
        {
            id: "4",
            name: "Spice Symphony",
            cuisine: "Indian, North Indian, Mughlai",
            address: "321 Whitefield, Bangalore",
            rating: 4.6,
            totalRatings: 2100,
            deliveryTime: "35-40 min",
            distance: "4.2 km",
            priceForTwo: 600,
            isVeg: true,
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
            isFavorite: true,
        },
    ];

    return (
        <View style={styles.container}>
            <HomeHeader />

            <View style={styles.content}>
                <FoodHeading
                    title="What are you craving today?"
                    highlightWord="craving"
                    subtitle="Freshly cooked food from nearby kitchens"
                    emoji="🤤"
                />

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            {...restaurant}
                            onPress={() => router.push("/(user)/resturantDetails")}
                            onCall={() => console.log("Calling:", restaurant.name)}
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
        backgroundColor: Colors.background,
    },
    content: {
        padding: Spacing.md,
    },
    subtitle: {
        marginTop: Spacing.sm,
        color: Colors.muted,
    },
    scrollContent: {
        paddingBottom: 300, // ✅ VERY IMPORTANT
    },
});