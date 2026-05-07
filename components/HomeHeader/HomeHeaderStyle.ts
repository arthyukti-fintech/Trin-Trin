import { Colors } from "@/app/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safe: {
        backgroundColor: Colors.accentSoft,
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
        marginBottom: 0,
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
    ownerActions: {
        flexDirection: "row",
        gap: 12,
        padding: 16,
    },

    ownerBtn: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },

    ownerBtnSecondary: {
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },

    ownerBtnText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 15,
    },
});