import { View, FlatList, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Colors, Spacing, Typography } from "./theme";
import RestaurantCard from "./components/RestaurantCard";
import BackHeader from "./components/BackHeader";

const MOCK_RESTAURANTS = [
    {
        id: "1",
        name: "Sharma Ji Dhaba",
        address: "Sector 18, Noida",
    },
    {
        id: "2",
        name: "Bansi Chaat Bhandar",
        address: "Near Metro Station",
    },
];

export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <BackHeader title="Bill Received" />
            <Text style={Typography.heading}>Nearby Restaurants</Text>
            <Text style={styles.subtitle}>
                Call the restaurant → Get bill via SMS → Pay in app
            </Text>

            <FlatList
                data={MOCK_RESTAURANTS}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginTop: Spacing.lg }}
                renderItem={({ item }) => (
                    <RestaurantCard
                        name={item.name}
                        address={item.address}
                        onCall={() => router.push("/(user)/order-waiting")}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: Spacing.md,
    },
    subtitle: {
        marginTop: Spacing.sm,
        color: Colors.muted,
    },
});