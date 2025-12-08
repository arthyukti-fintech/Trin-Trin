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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Typography } from "../theme";

export default function CompactFoodHeader() {
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

    // Demo data
    const userName = "Arman";
    const userEmail = "arman@example.com";
    const userPhone = "+91 98765 43210";
    const rewardPoints = 1250;
    const estimatedDelivery = "25 min";

    // Toggle order banner every 2 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            setShowOrderBanner(prev => !prev);
        }, 120000); // 2 minutes

        return () => clearInterval(interval);
    }, []);

    const savedAddresses = [
        { id: 1, label: "Home", address: "123 MG Road, Bangalore", icon: "home" },
        { id: 2, label: "Work", address: "456 Brigade Road, Bangalore", icon: "briefcase" },
        { id: 3, label: "Mom's", address: "789 Koramangala, Bangalore", icon: "heart" },
    ];

    const restaurants = [
        { id: 1, name: "Pizza Palace", cuisine: "Italian", rating: 4.5, time: "30 min", emoji: "🍕" },
        { id: 2, name: "Burger Bros", cuisine: "American", rating: 4.3, time: "25 min", emoji: "🍔" },
        { id: 3, name: "Sushi Master", cuisine: "Japanese", rating: 4.7, time: "40 min", emoji: "🍱" },
        { id: 4, name: "Taco Fiesta", cuisine: "Mexican", rating: 4.4, time: "35 min", emoji: "🌮" },
        { id: 5, name: "Curry House", cuisine: "Indian", rating: 4.6, time: "30 min", emoji: "🍛" },
    ];

    const filteredRestaurants = restaurants.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        setShowLocationDropdown(false);
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        setShowSearchResults(text.length > 0);
    };

    return (
        <SafeAreaView edges={["top"]} style={styles.safe}>
            {/* Order Banner - Appears/Disappears every 2 minutes */}
            {showOrderBanner && (
                <View style={styles.orderBanner}>
                    <View style={styles.orderContent}>
                        <View style={styles.pulseWrap}>
                            <View style={styles.pulseDot} />
                        </View>
                        <Text style={styles.orderText}>
                            Order arriving in <Text style={styles.orderTime}>{estimatedDelivery}</Text>
                        </Text>
                    </View>
                    <Pressable onPress={() => setShowOrderBanner(false)}>
                        <Ionicons name="close-circle" size={20} color="#fff" />
                    </Pressable>
                </View>
            )}

            <View style={styles.header}>
                {/* Top Row - Profile & Location */}
                <View style={styles.topRow}>
                    {/* Left - Profile */}
                    <Pressable
                        onPress={() => setShowProfileModal(true)}
                        style={({ pressed }) => [
                            styles.profileSection,
                            { opacity: pressed ? 0.8 : 1 },
                        ]}
                    >
                        <View style={styles.avatarWrap}>
                            <Text style={styles.avatarText}>
                                {userName.charAt(0).toUpperCase()}
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

                {/* Search Bar */}
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
                        <Pressable onPress={() => { setSearchQuery(""); setShowSearchResults(false); }}>
                            <Ionicons name="close-circle" size={20} color={Colors.muted} />
                        </Pressable>
                    )}
                </View>

                {/* Quick Filters */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filters}
                >
                    {[
                        { icon: "flash", label: "Fast", color: "#FF6B35" },
                        { icon: "star", label: "Top Rated", color: "#FFD700" },
                        { icon: "pricetag", label: "Offers", color: "#10B981" },
                        { icon: "leaf", label: "Veg", color: "#34D399" },
                    ].map((filter, i) => (
                        <Pressable key={i} style={styles.filterChip}>
                            <Ionicons name={filter.icon} size={14} color={filter.color} />
                            <Text style={styles.filterText}>{filter.label}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/* Profile Modal */}
            <Modal
                visible={showProfileModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowProfileModal(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setShowProfileModal(false)}>
                    <View style={styles.profileModal}>
                        <View style={styles.profileHeader}>
                            <View style={styles.largeAvatar}>
                                <Text style={styles.largeAvatarText}>
                                    {userName.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                            <Text style={styles.profileName}>{userName}</Text>
                            <Text style={styles.profileEmail}>{userEmail}</Text>

                            <View style={styles.rewardsCard}>
                                <Ionicons name="star" size={24} color="#FFD700" />
                                <View style={styles.rewardsInfo}>
                                    <Text style={styles.rewardsLabel}>Reward Points</Text>
                                    <Text style={styles.rewardsValue}>{rewardPoints}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.profileMenu}>
                            {[
                                { icon: "person-outline", label: "Edit Profile", color: "#6366F1" },
                                { icon: "receipt-outline", label: "My Orders", color: "#10B981" },
                                { icon: "heart-outline", label: "Favorites", color: "#EF4444" },
                                { icon: "wallet-outline", label: "Wallet", color: "#F59E0B" },
                                { icon: "settings-outline", label: "Settings", color: "#6B7280" },
                            ].map((item, i) => (
                                <Pressable key={i} style={styles.menuItem}>
                                    <View style={[styles.menuIcon, { backgroundColor: item.color + "20" }]}>
                                        <Ionicons name={item.icon} size={20} color={item.color} />
                                    </View>
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                    <Ionicons name="chevron-forward" size={18} color={Colors.muted} />
                                </Pressable>
                            ))}
                        </View>

                        <Pressable style={styles.closeButton} onPress={() => setShowProfileModal(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>

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
                            <Text style={styles.modalTitle}>{filteredRestaurants.length} found</Text>
                            <Pressable onPress={() => setShowSearchResults(false)}>
                                <Ionicons name="close" size={24} color={Colors.secondary} />
                            </Pressable>
                        </View>

                        <ScrollView>
                            {filteredRestaurants.map((restaurant) => (
                                <Pressable
                                    key={restaurant.id}
                                    onPress={() => {
                                        setShowSearchResults(false);
                                        setSearchQuery("");
                                    }}
                                    style={styles.restaurantItem}
                                >
                                    <Text style={styles.restaurantEmoji}>{restaurant.emoji}</Text>
                                    <View style={styles.restaurantInfo}>
                                        <Text style={styles.restaurantName}>{restaurant.name}</Text>
                                        <View style={styles.restaurantMeta}>
                                            <Ionicons name="star" size={12} color="#FFD700" />
                                            <Text style={styles.metaText}>{restaurant.rating}</Text>
                                            <Text style={styles.metaSeparator}>•</Text>
                                            <Text style={styles.metaText}>{restaurant.time}</Text>
                                        </View>
                                    </View>
                                    <Ionicons name="chevron-forward" size={18} color={Colors.muted} />
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        backgroundColor: "#FAFAFA",
    },

    orderBanner: {
        backgroundColor: "#10B981",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },

    orderContent: {
        flexDirection: "row",
        alignItems: "center",
    },

    pulseWrap: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    pulseDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#fff",
    },

    orderText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },

    orderTime: {
        fontWeight: "700",
    },

    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    avatarWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        position: "relative",
    },

    avatarText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    rewardsBadge: {
        position: "absolute",
        bottom: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#FAFAFA",
    },

    profileInfo: {
        flex: 1,
    },

    greeting: {
        fontSize: 15,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: 2,
    },

    pointsRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    points: {
        fontSize: 12,
        fontWeight: "600",
        color: Colors.muted,
        marginLeft: 4,
    },

    locationPill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    locationText: {
        fontSize: 13,
        fontWeight: "600",
        color: Colors.secondary,
        marginHorizontal: 6,
    },

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 48,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 12,
    },

    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: Colors.secondary,
        fontWeight: "500",
    },

    filters: {
        gap: 8,
    },

    filterChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginRight: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    filterText: {
        fontSize: 12,
        fontWeight: "600",
        color: Colors.secondary,
        marginLeft: 6,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },

    profileModal: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 24,
        maxHeight: "85%",
    },

    profileHeader: {
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },

    largeAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    largeAvatarText: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "700",
    },

    profileName: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: 4,
    },

    profileEmail: {
        fontSize: 14,
        color: Colors.muted,
        marginBottom: 16,
    },

    rewardsCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF7ED",
        borderRadius: 12,
        padding: 16,
        width: "100%",
    },

    rewardsInfo: {
        marginLeft: 12,
    },

    rewardsLabel: {
        fontSize: 12,
        color: Colors.muted,
        marginBottom: 4,
    },

    rewardsValue: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.primary,
    },

    profileMenu: {
        padding: 16,
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
    },

    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    menuLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: "600",
        color: Colors.secondary,
    },

    closeButton: {
        margin: 16,
        marginTop: 8,
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
    },

    closeButtonText: {
        fontSize: 15,
        fontWeight: "600",
        color: Colors.secondary,
    },

    locationModal: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 20,
        maxHeight: "60%",
    },

    searchModal: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 20,
        maxHeight: "70%",
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.secondary,
    },

    addressItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },

    selectedAddress: {
        backgroundColor: "#FFF7ED",
    },

    addressIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#FFF7ED",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    addressInfo: {
        flex: 1,
    },

    addressLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: 4,
    },

    addressText: {
        fontSize: 13,
        color: Colors.muted,
    },

    addAddress: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        paddingHorizontal: 20,
        backgroundColor: "#FFF7ED",
    },

    addAddressText: {
        fontSize: 15,
        fontWeight: "700",
        color: Colors.primary,
        marginLeft: 10,
    },

    restaurantItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },

    restaurantEmoji: {
        fontSize: 40,
        marginRight: 12,
    },

    restaurantInfo: {
        flex: 1,
    },

    restaurantName: {
        fontSize: 15,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: 4,
    },

    restaurantMeta: {
        flexDirection: "row",
        alignItems: "center",
    },

    metaText: {
        fontSize: 12,
        color: Colors.muted,
        marginLeft: 4,
    },

    metaSeparator: {
        fontSize: 12,
        color: Colors.muted,
        marginHorizontal: 6,
    },
});