import { StyleSheet } from "react-native";
import { Colors } from "../theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },

    // Header
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: Colors.secondary,
    },
    headerSubtitle: {
        fontSize: 14,
        color: Colors.muted,
        marginTop: 4,
    },
    menuIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: Colors.primarySoft,
        alignItems: "center",
        justifyContent: "center",
    },
    menuEmoji: {
        fontSize: 28,
    },

    // Categories
    categoriesWrapper: {
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    categoriesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: "row",
    },
    categoryTab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#F3F4F6",
        marginRight: 10,
    },
    categoryTabActive: {
        backgroundColor: Colors.primary,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.muted,
    },
    categoryTextActive: {
        color: "#fff",
    },

    // Menu List
    menuList: {
        flex: 1,
    },
    menuScrollContent: {
        padding: 16,
        paddingBottom: 32,
    },

    // Menu Card
    menuCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginBottom: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    imageWrapper: {
        width: "100%",
        height: 200,
        position: "relative",
    },
    menuImage: {
        width: "100%",
        height: "100%",
    },
    bestsellerTag: {
        position: "absolute",
        top: 12,
        left: 12,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(245, 158, 11, 0.95)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 4,
    },
    bestsellerTagText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#fff",
        letterSpacing: 0.5,
    },
    vegBadge: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    vegDot: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2.5,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    vegDotInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },

    // Card Content
    menuCardContent: {
        padding: 16,
    },
    menuCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    menuItemName: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.secondary,
        flex: 1,
    },
    spicyContainer: {
        flexDirection: "row",
        gap: 2,
    },
    spicyIcon: {
        fontSize: 14,
    },
    menuItemDescription: {
        fontSize: 14,
        color: Colors.muted,
        lineHeight: 20,
        marginBottom: 12,
    },
    priceTag: {
        alignSelf: "flex-start",
        backgroundColor: Colors.primarySoft,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    menuItemPrice: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primary,
    },

    // Footer
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        paddingVertical: 24,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    footerItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    vegIndicatorLegend: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#10B981",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    vegDotLegend: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#10B981",
    },
    footerText: {
        fontSize: 13,
        color: Colors.muted,
        fontWeight: "500",
    },
});