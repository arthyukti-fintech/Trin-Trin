import { View, FlatList, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Colors, Spacing, Typography } from "../theme";
import RestaurantCard from "../components/RestaurantCard";

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={Typography.heading}>Nearby Restaurants</Text>

            {/* <FlatList
                data={[{ id: "1", name: "Sharma Ji Dhaba", address: "Sector 18" }]}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ marginTop: Spacing.md }}
                renderItem={({ item }) => (
                    <RestaurantCard
                        name={item.name}
                        address={item.address}
                        onCall={() => router.push("/order-waiting")}
                    />
                )}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: Spacing.md,
    },
});
