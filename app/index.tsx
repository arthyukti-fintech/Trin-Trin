import { View, FlatList, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import HomeHeader from "./components/HomeHeader";
import { Colors, Spacing, Typography } from "./theme";
import RestaurantCard from "./components/RestaurantCard";

const RESTAURANTS = [
    { id: "1", name: "Sharma Ji Dhaba", address: "Sector 18" },
    { id: "2", name: "Bansi Chaat Bhandar", address: "Near Metro" },
];

export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <HomeHeader />

            {/* <View style={styles.content}>
                <Text style={Typography.heading}>Nearby Restaurantsss</Text>
                <Text style={styles.subtitle}>
                    Call → Get bill → Pay → OTP delivery
                </Text>

                <FlatList
                    data={RESTAURANTS}
                    keyExtractor={(i) => i.id}
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
            </View> */}
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
});
