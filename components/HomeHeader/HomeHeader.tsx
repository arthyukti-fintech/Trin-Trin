import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Pressable,
    TextInput,
    StyleSheet,
    ScrollView,
    Modal,
    Image,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/app/theme";
import { router } from "expo-router";
import { useGetMyProfileQuery } from "@/redux/services/profileApi";
import { useLocalSearchParams } from "expo-router";
import { styles } from "./HomeHeaderStyle";
import { useGetAllRestaurantsQuery } from "@/redux/services/resturantApi";

export default function CompactFoodHeader({ profileData }: any) {
    const navigation = useNavigation();
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showOrderBanner, setShowOrderBanner] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState({
        id: 1,
        label: "Home",
        address: "123 MG Road",
        icon: "home",
    });
    const { restaurantId } = useLocalSearchParams();
    console.log(searchQuery, "------------searchQuery")
    const { data: restaurantsData, isLoading } = useGetAllRestaurantsQuery({
        search: searchQuery,
    });

    const userName = profileData?.data?.fullName?.split(" ")[0] || "User";

    const userEmail = "arman@example.com";
    const userPhone = "+91 98765 43210";
    const rewardPoints = 1250;
    const estimatedDelivery = "25 min";
    // console.log("profiledata------------->", profileData?.data?.role)
    const isRestaurantOwner =
        profileData?.data?.role === "resturantsOwner";

    useEffect(() => {
        const interval = setInterval(() => {
            setShowOrderBanner(prev => !prev);
        }, 120000); // 2 minutes

        return () => clearInterval(interval);
    }, []);

    type IconName = React.ComponentProps<typeof Ionicons>["name"];

    const savedAddresses: { id: number; label: string; address: string; icon: IconName }[] = [
        { id: 1, label: "Home", address: "123 MG Road", icon: "home" },
        { id: 2, label: "Work", address: "456 Brigade Road", icon: "briefcase" },
        { id: 3, label: "Mom's", address: "789 Koramangala", icon: "heart" },
    ];

    const restaurants = restaurantsData?.data?.restaurants || [];
    console.log("SEARCH RESULTS:", JSON.stringify(restaurantsData));

    const handleAddressSelect = (address: any) => {
        setSelectedAddress(address);
        setShowLocationDropdown(false);
    };

    const handleSearch = (text: any) => {
        setSearchQuery(text);
        setShowSearchResults(text.length > 0);
    };

    return (
        <SafeAreaView edges={["top"]} style={styles.safe}>
            {/* Order Banner - Appears/Disappears every 2 minutes */}

            {
                isRestaurantOwner
                    ? null
                    : showOrderBanner && (
                        <View style={styles.orderBanner}>
                            <View style={styles.orderContent}>
                                <View style={styles.pulseWrap}>
                                    <View style={styles.pulseDot} />
                                </View>
                                <Text style={styles.orderText}>
                                    Order arriving{" "}
                                    <Text style={styles.orderTime}>{estimatedDelivery}</Text>
                                </Text>
                            </View>
                            <Pressable onPress={() => setShowOrderBanner(false)}>
                                <Ionicons name="close-circle" size={20} color="#fff" />
                            </Pressable>
                        </View>
                    )
            }


            <View style={styles.header}>
                {/* Top Row - Profile & Location */}
                <View style={styles.topRow}>
                    {/* Left - Profile */}
                    <Pressable
                        onPress={() => router.push("/Profile")}
                        style={({ pressed }) => [
                            styles.profileSection,
                            { opacity: pressed ? 0.8 : 1 },
                        ]}
                    >
                        <View style={styles.avatarWrap}>
                            <Text style={styles.avatarText}>
                                {userName?.charAt(0)?.toUpperCase() || "U"}

                            </Text>
                            <View style={styles.rewardsBadge}>
                                <Ionicons name="star" size={10} color="#FFD700" />
                            </View>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.greeting}>Hey {userName}! 👋</Text>
                            <View style={styles.pointsRow}>
                                <Ionicons name="star" size={12} color="#FFD700" />
                                <Text style={styles.points}>{rewardPoints} pts</Text>
                            </View>
                        </View>
                    </Pressable>

                    {/* Right - Location */}
                    <Pressable
                        onPress={() => setShowLocationDropdown(true)}
                        style={({ pressed }) => [
                            styles.locationPill,
                            { opacity: pressed ? 0.8 : 1 },
                        ]}
                    >
                        <Ionicons name="location-sharp" size={14} color={Colors.primary} />
                        <Text style={styles.locationText}>{selectedAddress.label}</Text>
                        <Ionicons name="chevron-down" size={12} color={Colors.secondary} />
                    </Pressable>
                </View>


                {isRestaurantOwner ? (
                    /* 🧑‍🍳 Restaurant Owner UI */
                    <View style={styles.ownerActions}>
                        <Pressable style={styles.ownerBtn}>
                            <Text style={styles.ownerBtnText}> Dashboard</Text>
                        </Pressable>

                        <Pressable
                            style={styles.ownerBtnSecondary}
                            onPress={() =>
                                router.push({
                                    pathname: "/TakeOrders",
                                    params: {
                                        restaurantId: restaurantId,

                                    },
                                })
                            }
                        >
                            <Text style={styles.ownerBtnText}>Take Orders</Text>
                        </Pressable>
                    </View>
                ) : (
                    /* 👤 Customer UI */
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color={Colors.primary} />
                        <TextInput
                            value={searchQuery}
                            onChangeText={handleSearch}
                            onFocus={() => searchQuery && setShowSearchResults(true)}
                            placeholder="Search dishes or restaurants..."
                            placeholderTextColor={Colors.muted}
                            style={styles.searchInput}
                        />
                        {searchQuery.length > 0 && (
                            <Pressable
                                onPress={() => {
                                    setSearchQuery("");
                                    setShowSearchResults(false);
                                }}
                            >
                                <Ionicons name="close-circle" size={20} color={Colors.muted} />
                            </Pressable>
                        )}
                    </View>
                )}

            </View>

            {/* Profile Modal */}


            {/* Location Dropdown Modal */}
            <Modal
                visible={showLocationDropdown}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowLocationDropdown(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setShowLocationDropdown(false)}>
                    <View style={styles.locationModal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Deliver to</Text>
                            <Pressable onPress={() => setShowLocationDropdown(false)}>
                                <Ionicons name="close" size={24} color={Colors.secondary} />
                            </Pressable>
                        </View>

                        {savedAddresses.map((addr) => (
                            <Pressable
                                key={addr.id}
                                onPress={() => handleAddressSelect(addr)}
                                style={[
                                    styles.addressItem,
                                    selectedAddress.id === addr.id && styles.selectedAddress,
                                ]}
                            >
                                <View style={styles.addressIcon}>
                                    <Ionicons name={addr.icon} size={18} color={Colors.primary} />
                                </View>
                                <View style={styles.addressInfo}>
                                    <Text style={styles.addressLabel}>{addr.label}</Text>
                                    <Text style={styles.addressText}>{addr.address}</Text>
                                </View>
                                {selectedAddress.id === addr.id && (
                                    <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                                )}
                            </Pressable>
                        ))}

                        <Pressable style={styles.addAddress}>
                            <Ionicons name="add-circle" size={22} color={Colors.primary} />
                            <Text style={styles.addAddressText}>Add New Address</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>

            {/* Search Results Modal */}
            <Modal
                visible={showSearchResults}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowSearchResults(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setShowSearchResults(false)}>
                    <View style={styles.searchModal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {isLoading ? "Searching..." : `${restaurants.length} found`}
                            </Text>
                            <Pressable onPress={() => setShowSearchResults(false)}>
                                <Ionicons name="close" size={24} color={Colors.secondary} />
                            </Pressable>
                        </View>

                        {isLoading ? (
                            <ActivityIndicator size="small" color={Colors.primary} style={{ padding: 20 }} />
                        ) : restaurants.length === 0 ? (
                            <Text style={{ padding: 20, textAlign: "center", color: Colors.muted }}>
                                No restaurants found for "{searchQuery}"
                            </Text>
                        ) : (
                            <ScrollView>
                                {restaurants.map((restaurant) => (
                                    <Pressable
                                        key={restaurant._id}
                                        onPress={() => {
                                            setShowSearchResults(false);
                                            setSearchQuery("");
                                            // router.push(`/restaurant/${restaurant._id}`); // ← navigate if needed
                                        }}
                                        style={styles.restaurantItem}
                                    >
                                        <View style={styles.restaurantInfo}>
                                            <Text style={styles.restaurantName}>{restaurant.name}</Text>
                                            <View style={styles.restaurantMeta}>
                                                <Ionicons name="star" size={12} color="#FFD700" />
                                                <Text style={styles.metaText}>{restaurant.rating}</Text>
                                                <Text style={styles.metaSeparator}>•</Text>
                                                <Text style={styles.metaText}>{restaurant.cuisine}</Text>
                                            </View>
                                        </View>
                                        <Ionicons name="chevron-forward" size={18} color={Colors.muted} />
                                    </Pressable>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}