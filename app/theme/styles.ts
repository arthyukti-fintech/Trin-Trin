import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // Common styles
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    screenContainer: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    scrollView: {
        flex: 1,
    },

    // Header Image
    headerImage: {
        height: 220,
        position: "relative",
    },
    restaurantImage: {
        width: "100%",
        height: "100%",
    },
    headerOverlay: {
        position: "absolute",
        top: 40,
        left: 16,
        right: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerButton: {
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 8,
        borderRadius: 50,
    },
    headerActions: {
        flexDirection: "row",
        gap: 10,
    },

    // Restaurant Info Card
    infoCard: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -4 },
        elevation: 8,
    },
    infoHeader: {
        marginBottom: 12,
    },
    infoTitleSection: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    restaurantCuisine: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    locationText: {
        fontSize: 13,
        color: "#666",
    },

    // Stats Row
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 12,
        backgroundColor: "#f8f8f8",
        borderRadius: 12,
        marginBottom: 12,
    },
    statItem: {
        alignItems: "center",
        gap: 4,
    },
    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#48b560",
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
        color: "#666",
    },
    priceLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: "#ddd",
    },

    // Offers Section
    offersSection: {
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 8,
    },
    offersScroll: {
        marginHorizontal: -16,
        paddingHorizontal: 16,
    },
    offerCard: {
        backgroundColor: "#fff4f0",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#ff5200",
        borderStyle: "dashed",
    },
    offerText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#ff5200",
    },

    // Category Tabs
    categorySection: {
        backgroundColor: "#fff",
        paddingVertical: 12,
    },
    categoryScroll: {
        paddingHorizontal: 16,
    },
    categoryTab: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    categoryTabActive: {
        borderBottomColor: "#ff5200",
    },
    categoryTabText: {
        fontSize: 14,
        color: "#777",
        fontWeight: "500",
    },
    categoryTabTextActive: {
        color: "#ff5200",
    },

    // Menu Section
    menuSection: {
        padding: 16,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 12,
        marginTop: 8,
    },
    menuItem: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
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
        paddingRight: 10,
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
        color: "#ff9800",
    },
    menuItemName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    menuItemDescription: {
        fontSize: 13,
        color: "#666",
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
        color: "#1a1a1a",
    },
    itemRating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    itemRatingText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#666",
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
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        borderWidth: 1,
        borderColor: "#ff5200",
    },
    addButtonText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#ff5200",
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
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        borderWidth: 1,
        borderColor: "#ff5200",
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
        color: "#ff5200",
    },

    // Floating Cart Button
    floatingCart: {
        position: "absolute",
        bottom: 20,
        left: 16,
        right: 16,
        backgroundColor: "#ff5200",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 12,
        shadowColor: "#000",
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
        color: "#ff5200",
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
        padding: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
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
        color: "#1a1a1a",
    },
    cartScrollView: {
        flex: 1,
    },
    cartItems: {
        padding: 16,
        backgroundColor: "#fff",
        marginBottom: 12,
    },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    cartItemInfo: {
        flex: 1,
        marginLeft: 8,
    },
    cartItemName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    cartItemPrice: {
        fontSize: 13,
        color: "#666",
    },
    cartQuantityControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 12,
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
        color: "#ff5200",
        marginHorizontal: 12,
    },
    cartItemTotal: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1a1a1a",
        minWidth: 60,
        textAlign: "right",
    },

    // Bill Details
    billCard: {
        backgroundColor: "#fff",
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 12,
    },
    billTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 12,
    },
    billRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    billLabel: {
        fontSize: 14,
        color: "#666",
    },
    billValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    billDivider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 12,
    },
    billTotalLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    billTotalValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#ff5200",
    },

    // Checkout Footer
    checkoutFooter: {
        backgroundColor: "#fff",
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    footerTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    footerTotalLabel: {
        fontSize: 14,
        color: "#666",
    },
    footerTotalValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    checkoutButton: {
        backgroundColor: "#ff5200",
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
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
    },
    checkoutCardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 12,
    },
    addressCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        backgroundColor: "#f8f8f8",
        padding: 12,
        borderRadius: 12,
    },
    addressInfo: {
        flex: 1,
    },
    addressType: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    addressText: {
        fontSize: 13,
        color: "#666",
        lineHeight: 18,
    },
    paymentOption: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        backgroundColor: "#f8f8f8",
        borderRadius: 12,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ff5200",
        alignItems: "center",
        justifyContent: "center",
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#ff5200",
    },
    paymentText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    summaryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    summaryItemName: {
        fontSize: 14,
        color: "#666",
    },
    summaryItemPrice: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    summaryTotal: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    summaryTotalValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#ff5200",
    },
    placeOrderButton: {
        backgroundColor: "#ff5200",
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    successContent: {
        alignItems: "center",
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#e8f5e9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 8,
        textAlign: "center",
    },
    successMessage: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 32,
        lineHeight: 20,
    },
    orderSummary: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginBottom: 8,
    },
    orderLabel: {
        fontSize: 14,
        color: "#666",
    },
    orderValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    trackButton: {
        backgroundColor: "#ff5200",
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: 12,
        marginTop: 32,
    },
    trackButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
});

// Colors helper
const Colors = {
    primary: "#ff5200",
    secondary: "#1a1a1a",
    success: "#48b560",
    danger: "#ff0000",
    warning: "#ff9800",
    muted: "#666",
    background: "#f8f8f8",
    card: "#fff",
    border: "#eee",
    shadow: "#000",
    primarySoft: "#fff4f0",
};
