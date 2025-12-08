import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../theme";

type Props = {
    id: string;
    name: string;
    cuisine: string;
    address: string;
    rating: number;
    totalRatings: number;
    deliveryTime: string;
    distance: string;
    priceForTwo: number;
    discount?: string;
    isVeg: boolean;
    image: string; // URL or require() path
    isFavorite?: boolean;
    onPress?: () => void;
    onCall?: () => void;
};

export default function RestaurantCard({
    id,
    name,
    cuisine,
    address,
    rating,
    totalRatings,
    deliveryTime,
    distance,
    priceForTwo,
    discount,
    isVeg,
    image,
    isFavorite = false,
    onPress,
    onCall,
}: Props) {
    const [favorite, setFavorite] = useState(isFavorite);

    const toggleFavorite = () => {
        setFavorite(!favorite);
        // Here you can add logic to save to backend/storage
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 4.0) return "#10B981";
        if (rating >= 3.0) return "#F59E0B";
        return "#EF4444";
    };

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                { opacity: pressed ? 0.95 : 1 },
            ]}
        >
            {/* Image Section */}
            <View style={styles.imageContainer}>
                <Image
                    source={typeof image === 'string' ? { uri: image } : image}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/* Discount Badge */}
                {discount && (
                    <View style={styles.discountBadge}>
                        <Ionicons name="pricetag" size={12} color="#fff" />
                        <Text style={styles.discountText}>{discount}</Text>
                    </View>
                )}

                {/* Favorite Button */}
                <Pressable
                    onPress={toggleFavorite}
                    style={styles.favoriteButton}
                >
                    <Ionicons
                        name={favorite ? "heart" : "heart-outline"}
                        size={20}
                        color={favorite ? "#EF4444" : "#fff"}
                    />
                </Pressable>

                {/* Veg/Non-Veg Badge */}
                <View style={[styles.vegBadge, { backgroundColor: isVeg ? "#10B981" : "#EF4444" }]}>
                    <View style={[styles.vegDot, { borderColor: isVeg ? "#10B981" : "#EF4444" }]}>
                        <View style={[styles.vegDotInner, { backgroundColor: isVeg ? "#10B981" : "#EF4444" }]} />
                    </View>
                </View>
            </View>

            {/* Content Section */}
            <View style={styles.content}>
                {/* Restaurant Name & Cuisine */}
                <View style={styles.header}>
                    <View style={styles.nameSection}>
                        <Text style={styles.name} numberOfLines={1}>{name}</Text>
                        <Text style={styles.cuisine} numberOfLines={1}>{cuisine}</Text>
                    </View>
                </View>

                {/* Rating, Time & Distance */}
                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <View style={[styles.ratingBadge, { backgroundColor: getRatingColor(rating) + "20" }]}>
                            <Ionicons name="star" size={12} color={getRatingColor(rating)} />
                            <Text style={[styles.ratingText, { color: getRatingColor(rating) }]}>
                                {rating}
                            </Text>
                        </View>
                        <Text style={styles.ratingsCount}>({totalRatings}+)</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.metaItem}>
                        <Ionicons name="time-outline" size={14} color={Colors.muted} />
                        <Text style={styles.metaText}>{deliveryTime}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.metaItem}>
                        <Ionicons name="location-outline" size={14} color={Colors.muted} />
                        <Text style={styles.metaText}>{distance}</Text>
                    </View>
                </View>

                {/* Price for Two */}
                <View style={styles.priceRow}>
                    <Ionicons name="wallet-outline" size={16} color={Colors.muted} />
                    <Text style={styles.priceText}>₹{priceForTwo} for two</Text>
                </View>

                {/* Address */}
                <View style={styles.addressRow}>
                    <Ionicons name="navigate-outline" size={14} color={Colors.muted} />
                    <Text style={styles.address} numberOfLines={1}>{address}</Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionRow}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.callButton,
                            { opacity: pressed ? 0.8 : 1 },
                        ]}
                        onPress={onCall}
                    >
                        <Ionicons name="call" size={16} color={Colors.primary} />
                        <Text style={styles.callText}>Call</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.orderButton,
                            { opacity: pressed ? 0.9 : 1 },
                        ]}
                        onPress={onPress}
                    >
                        <Text style={styles.orderText}>Order Now</Text>
                        <Ionicons name="arrow-forward" size={16} color="#fff" />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: 16,
        marginBottom: Spacing.md,
        shadowColor: Colors.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
        overflow: "hidden",
    },
    imageContainer: {
        width: "100%",
        height: 180,
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    discountBadge: {
        position: "absolute",
        top: 12,
        left: 12,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 4,
    },
    discountText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
    },
    favoriteButton: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    vegBadge: {
        position: "absolute",
        bottom: 12,
        right: 12,
        width: 28,
        height: 28,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    vegDot: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    vegDotInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    content: {
        padding: Spacing.md,
    },
    header: {
        marginBottom: Spacing.sm,
    },
    nameSection: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: 4,
    },
    cuisine: {
        fontSize: 13,
        color: Colors.muted,
        fontWeight: "500",
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Spacing.sm,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 3,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: "700",
    },
    ratingsCount: {
        fontSize: 11,
        color: Colors.muted,
        marginLeft: 4,
    },
    divider: {
        width: 1,
        height: 14,
        backgroundColor: Colors.border,
        marginHorizontal: 10,
    },
    metaText: {
        fontSize: 12,
        color: Colors.muted,
        fontWeight: "500",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: Spacing.xs,
    },
    priceText: {
        fontSize: 13,
        color: Colors.secondary,
        fontWeight: "600",
    },
    addressRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: Spacing.md,
    },
    address: {
        flex: 1,
        fontSize: 12,
        color: Colors.muted,
    },
    actionRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: Spacing.xs,
    },
    callButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primarySoft,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 6,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    callText: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.primary,
    },
    orderButton: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 6,
    },
    orderText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#fff",
    },
});