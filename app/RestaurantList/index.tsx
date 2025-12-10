import { View, FlatList, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Colors, Spacing, Typography } from "../theme";

import { ScrollView } from "react-native-gesture-handler";
import CompactFoodHeader from "@/components/HomeHeader/HomeHeader";
import FoodHeading from "@/components/FoodHeading";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants } from "../data/restaurants";

export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <CompactFoodHeader />

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
                            // onPress={() => router.push("/(user)/resturantDetails")}
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