import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Colors } from '../theme/colors'
import { useState } from "react";

const Icon = ({ name, size = 20, color = Colors.secondary }) => {
    const icons = {
        "arrow-back": "←",
        "heart": "♥",
        "heart-outline": "♡",
        "share": "⎋",
        "star": "★",
        "time": "⏱",
        "location": "📍",
        "info": "ⓘ",
        "leaf": "🌿",
        "flame": "🔥",
        "cart": "🛒",
        "add": "+",
        "remove": "−",
        "close": "✕",
        "check": "✓",
    };

    return (
        <Text style={{ fontSize: size, color, lineHeight: size }}>
            {icons[name] || "•"}
        </Text>
    );
};

const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};


export function RestaurantDetails({
    restaurant,
    menu,
    onNavigateToCart,
    addToCart,
    removeFromCart,
    getCartItemQuantity,
    cartCount,
    favorite,
    setFavorite
}) {
    const [selectedCategory, setSelectedCategory] = useState(menu[0].category);

    return (
        <View style={styles.screenContainer}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header Image */}
                <View style={styles.headerImage}>
                    <Image
                        source={{ uri: restaurant.image }}
                        style={styles.restaurantImage}
                    />
                    <View style={styles.headerOverlay}>
                        <Pressable style={styles.headerButton}>
                            <Icon name="arrow-back" size={24} color="#fff" />
                        </Pressable>

                        <View style={styles.headerActions}>
                            <Pressable
                                style={styles.headerButton}
                                onPress={() => setFavorite(!favorite)}
                            >
                                <Icon name={favorite ? "heart" : "heart-outline"} size={24} color="#fff" />
                            </Pressable>
                            <Pressable style={styles.headerButton}>
                                <Icon name="share" size={24} color="#fff" />
                            </Pressable>
                        </View>
                    </View>
                </View>

                {/* Restaurant Info */}
                <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                        <View style={styles.infoTitleSection}>
                            <Text style={styles.restaurantName}>{restaurant.name}</Text>
                            <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
                            <View style={styles.locationRow}>
                                <Icon name="location" size={14} color={Colors.muted} />
                                <Text style={styles.locationText}>{restaurant.address}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Ratings & Info */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <View style={styles.ratingBadge}>
                                <Icon name="star" size={14} color="#fff" />
                                <Text style={styles.ratingText}>{restaurant.rating}</Text>
                            </View>
                            <Text style={styles.statLabel}>{restaurant.totalRatings}+ ratings</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Icon name="time" size={18} color={Colors.secondary} />
                            <Text style={styles.statLabel}>{restaurant.deliveryTime}</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.priceLabel}>₹{restaurant.priceForTwo}</Text>
                            <Text style={styles.statLabel}>for two</Text>
                        </View>
                    </View>

                    {/* Offers */}
                    <View style={styles.offersSection}>
                        <Text style={styles.sectionTitle}>🎉 Offers</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offersScroll}>
                            {restaurant.offers.map((offer, index) => (
                                <View key={index} style={styles.offerCard}>
                                    <Text style={styles.offerText}>{offer}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Category Tabs */}
                <View style={styles.categorySection}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                        {menu.map((category) => (
                            <Pressable
                                key={category.id}
                                onPress={() => setSelectedCategory(category.category)}
                                style={[
                                    styles.categoryTab,
                                    selectedCategory === category.category && styles.categoryTabActive
                                ]}
                            >
                                <Text style={[
                                    styles.categoryTabText,
                                    selectedCategory === category.category && styles.categoryTabTextActive
                                ]}>
                                    {category.category}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                {/* Menu Items */}
                <View style={styles.menuSection}>
                    {menu
                        .filter(cat => cat.category === selectedCategory)
                        .map(category => (
                            <View key={category.id}>
                                <Text style={styles.categoryTitle}>
                                    {category.category} ({category.items.length})
                                </Text>
                                {category.items.map(item => (
                                    <MenuItem
                                        key={item.id}
                                        item={item}
                                        onAdd={() => addToCart(item)}
                                        onRemove={() => removeFromCart(item.id)}
                                        quantity={getCartItemQuantity(item.id)}
                                    />
                                ))}
                            </View>
                        ))}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Floating Cart Button */}
            {cartCount > 0 && (
                <Pressable style={styles.floatingCart} onPress={onNavigateToCart}>
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{cartCount}</Text>
                    </View>
                    <Text style={styles.floatingCartText}>View Cart</Text>
                    <Icon name="cart" size={20} color="#fff" />
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollView: {
        flex: 1,
    },

    // Header Image
    headerImage: {
        width: "100%",
        height: 240,
        position: "relative",
    },
    restaurantImage: {
        width: "100%",
        height: "100%",
    },
    headerOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: Spacing.md,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    headerActions: {
        flexDirection: "row",
        gap: 10,
    },

    // Restaurant Info
    infoCard: {
        backgroundColor: Colors.card,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        padding: Spacing.lg,
        shadowColor: Colors.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -4 },
        elevation: 8,
    },
    infoHeader: {
        marginBottom: Spacing.md,
    },
    infoTitleSection: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: 4,
    },
    restaurantCuisine: {
        fontSize: 14,
        color: Colors.muted,
        marginBottom: 8,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    locationText: {
        fontSize: 13,
        color: Colors.muted,
    },

    // Stats
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: Spacing.md,
        backgroundColor: Colors.background,
        borderRadius: 12,
        marginBottom: Spacing.md,
    },
    statItem: {
        alignItems: "center",
        gap: 4,
    },
    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.success,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#fff",
    },
    statLabel: {
        fontSize: 12,
        color: Colors.muted,
    },
    priceLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.secondary,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: Colors.border,
    },

    // Offers
    offersSection: {
        marginTop: Spacing.sm,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: Spacing.sm,
    },
    offersScroll: {
        marginHorizontal: -Spacing.lg,
        paddingHorizontal: Spacing.lg,
    },
    offerCard: {
        backgroundColor: Colors.primarySoft,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderStyle: "dashed",
    },
    offerText: {
        fontSize: 13,
        fontWeight: "600",
        color: Colors.primary,
    },

    // Categories
    categorySection: {
        backgroundColor: Colors.card,
        paddingVertical: Spacing.md,
    },
    categoryScroll: {
        paddingHorizontal: Spacing.md,
    },
    categoryTab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: Colors.background,
    },
    categoryTabActive: {
        backgroundColor: Colors.primary,
    },
    categoryTabText: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.muted,
    },
    categoryTabTextActive: {
        color: "#fff",
    },

    // Menu
    menuSection: {
        padding: Spacing.md,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: Spacing.md,
        marginTop: Spacing.sm,
    },
    menuItem: {
        backgroundColor: Colors.card,
        borderRadius: 12,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        shadowColor: Colors.shadow,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    menuItemContent: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    menuItemInfo: {
        flex: 1,
        paddingRight: Spacing.md,
    },
    vegIndicator: {
        marginBottom: 6,
    },
    vegDot: {
        width: 16,
        height: 16,
        borderRadius: 3,
        borderWidth: 2,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    vegDotInner: {
        width: 8,
        height: 8,
        borderRadius: 2,
    },
    bestsellerBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 6,
    },
    bestsellerText: {
        fontSize: 11,
        fontWeight: "700",
        color: Colors.warning,
    },
    menuItemName: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: 4,
    },
    menuItemDescription: {
        fontSize: 13,
        color: Colors.muted,
        marginBottom: 8,
        lineHeight: 18,
    },
    menuItemFooter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    menuItemPrice: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.secondary,
    },
    itemRating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    itemRatingText: {
        fontSize: 12,
        fontWeight: "600",
        color: Colors.muted,
    },
    menuItemImageContainer: {
        position: "relative",
    },
    menuItemImage: {
        width: 120,
        height: 120,
        borderRadius: 12,
    },
    addButton: {
        position: "absolute",
        bottom: -10,
        left: 10,
        right: 10,
        backgroundColor: "#fff",
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
        shadowColor: Colors.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    addButtonText: {
        fontSize: 13,
        fontWeight: "700",
        color: Colors.primary,
    },
    quantityControl: {
        position: "absolute",
        bottom: -10,
        left: 10,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 8,
        shadowColor: Colors.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    quantityButton: {
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    quantityText: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.primary,
    },

    // Floating Cart
    floatingCart: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: Colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 12,
        shadowColor: Colors.shadow,
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
        gap: 10,
    },
    cartBadge: {
        backgroundColor: "#fff",
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    cartBadgeText: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.primary,
    },
    floatingCartText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },

    // Cart Screen
    cartHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: Spacing.md,
        backgroundColor: Colors.card,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    cartHeaderTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.secondary,
    },
    cartScrollView: {
        flex: 1,
    },
    cartItems: {
        padding: Spacing.md,
        backgroundColor: Colors.card,
        marginBottom: Spacing.md,
    },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    cartItemInfo: {
        flex: 1,
        marginLeft: Spacing.sm,
    },
    cartItemName: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.secondary,
        marginBottom: 4,
    },
    cartItemPrice: {
        fontSize: 13,
        color: Colors.muted,
    },
    cartQuantityControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.background,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: Spacing.md,
    },
    cartQuantityButton: {
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    cartQuantityText: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.primary,
        marginHorizontal: 12,
    },
    cartItemTotal: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.secondary,
        minWidth: 60,
        textAlign: "right",
    },

    // Bill Details
    billCard: {
        backgroundColor: Colors.card,
        padding: Spacing.lg,
        marginHorizontal: Spacing.md,
        borderRadius: 12,
    },
    billTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: Spacing.md,
    },
    billRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Spacing.sm,
    },
    billLabel: {
        fontSize: 14,
        color: Colors.muted,
    },
    billValue: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.secondary,
    },
    billDivider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.md,
    },
    billTotalLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.secondary,
    },
    billTotalValue: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.primary,
    },

    // Checkout Footer
    checkoutFooter: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.card,
        padding: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    footerTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Spacing.sm,
    },
    footerTotalLabel: {
        fontSize: 14,
        color: Colors.muted,
    },
    footerTotalValue: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.secondary,
    },
    checkoutButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    checkoutButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },

    // Checkout Screen
    checkoutScroll: {
        flex: 1,
    },
    checkoutCard: {
        backgroundColor: Colors.card,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
    },
    checkoutCardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: Spacing.md,
    },
    addressCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        backgroundColor: Colors.background,
        padding: Spacing.md,
        borderRadius: 12,
    },
    addressInfo: {
        flex: 1,
    },
    addressType: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: 4,
    },
    addressText: {
        fontSize: 13,
        color: Colors.muted,
        lineHeight: 18,
    },
    paymentOption: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: Spacing.md,
        backgroundColor: Colors.background,
        borderRadius: 12,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    paymentText: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.secondary,
    },
    summaryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Spacing.sm,
    },
    summaryItemName: {
        fontSize: 14,
        color: Colors.muted,
    },
    summaryItemPrice: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.secondary,
    },
    summaryTotal: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.secondary,
    },
    summaryTotalValue: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.primary,
    },
    placeOrderButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    placeOrderButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },

    // Success Screen
    successContainer: {
        flex: 1,
        backgroundColor: Colors.card,
        alignItems: "center",
        justifyContent: "center",
        padding: Spacing.xl,
    },
    successContent: {
        alignItems: "center",
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.success + "20",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: Spacing.lg,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: Spacing.sm,
        textAlign: "center",
    },
    successMessage: {
        fontSize: 14,
        color: Colors.muted,
        textAlign: "center",
        marginBottom: Spacing.xl,
        lineHeight: 20,
    },
    orderSummary: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        marginBottom: Spacing.sm,
    },
    orderLabel: {
        fontSize: 14,
        color: Colors.muted,
    },
    orderValue: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.secondary,
    },
    trackButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: 12,
        marginTop: Spacing.xl,
    },
    trackButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
});