import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing } from "../theme";
import { useLocalSearchParams } from "expo-router";

type MenuItemProps = {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    isVeg: boolean;
    isBestseller?: boolean;
    rating?: number;
    totalOrders?: number;
    customizable?: boolean;
    spicyLevel?: 0 | 1 | 2 | 3; // 0=not spicy, 1=mild, 2=medium, 3=hot
    serves?: number;
    onAdd?: (item: any) => void;
    onRemove?: (item: any) => void;
    quantity?: number;
};

export default function MenuCard({
    id,
    name,
    description,
    price,
    originalPrice,
    image,
    isVeg,
    isBestseller = false,
    rating,
    totalOrders,
    customizable = false,
    spicyLevel = 0,
    serves,
    onAdd,
    onRemove,
    quantity = 0,
}: MenuItemProps) {
    const [localQuantity, setLocalQuantity] = useState(quantity);

    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;


    const handleAdd = () => {
        const newQuantity = localQuantity + 1;
        setLocalQuantity(newQuantity);
        onAdd?.({ id, name, price, quantity: newQuantity });
    };

    const handleRemove = () => {
        if (localQuantity > 0) {
            const newQuantity = localQuantity - 1;
            setLocalQuantity(newQuantity);
            onRemove?.({ id, name, price, quantity: newQuantity });
        }
    };

    const renderSpicyIcons = () => {
        if (spicyLevel === 0) return null;
        return (
            <View style={styles.spicyContainer}>
                {[...Array(spicyLevel)].map((_, i) => (
                    <Text key={i} style={styles.spicyIcon}>🌶️</Text>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.card}>
            <View style={styles.contentRow}>
                {/* Left Content */}
                <View style={styles.leftContent}>
                    {/* Veg/Non-Veg Indicator */}
                    <View style={styles.topRow}>
                        <View style={[styles.vegIndicator, { borderColor: isVeg ? "#10B981" : "#EF4444" }]}>
                            <View style={[styles.vegDot, { backgroundColor: isVeg ? "#10B981" : "#EF4444" }]} />
                        </View>

                        {isBestseller && (
                            <View style={styles.bestsellerBadge}>
                                <Ionicons name="star" size={10} color="#FFD700" />
                                <Text style={styles.bestsellerText}>BESTSELLER</Text>
                            </View>
                        )}
                    </View>

                    {/* Item Name */}
                    <Text style={styles.itemName}>{name}</Text>

                    {/* Rating & Orders */}
                    {(rating || totalOrders) && (
                        <View style={styles.statsRow}>
                            {rating && (
                                <View style={styles.ratingBadge}>
                                    <Ionicons name="star" size={12} color="#FFD700" />
                                    <Text style={styles.ratingText}>{rating}</Text>
                                </View>
                            )}
                            {totalOrders && (
                                <Text style={styles.ordersText}>({totalOrders}+ orders)</Text>
                            )}
                        </View>
                    )}

                    {/* Price Section */}
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>₹{price}</Text>
                        {originalPrice && originalPrice > price && (
                            <>
                                <Text style={styles.originalPrice}>₹{originalPrice}</Text>
                                <View style={styles.discountBadge}>
                                    <Text style={styles.discountText}>{discount}% OFF</Text>
                                </View>
                            </>
                        )}
                    </View>

                    {/* Description */}
                    <Text style={styles.description} numberOfLines={2}>
                        {description}
                    </Text>

                    {/* Additional Info */}
                    <View style={styles.infoRow}>
                        {renderSpicyIcons()}
                        {serves && (
                            <View style={styles.servesInfo}>
                                <Ionicons name="people-outline" size={12} color={Colors.muted} />
                                <Text style={styles.servesText}>Serves {serves}</Text>
                            </View>
                        )}
                    </View>

                    {/* Customizable Tag */}
                    {customizable && (
                        <View style={styles.customizableTag}>
                            <Ionicons name="options-outline" size={12} color={Colors.primary} />
                            <Text style={styles.customizableText}>Customizable</Text>
                        </View>
                    )}
                </View>

                {/* Right Image & Add Button */}
                <View style={styles.rightContent}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={typeof image === 'string' ? { uri: image } : image}
                            style={styles.image}
                            resizeMode="cover"
                        />

                        {/* Add/Quantity Button */}
                        {localQuantity === 0 ? (
                            <Pressable
                                style={({ pressed }) => [
                                    styles.addButton,
                                    { opacity: pressed ? 0.9 : 1 },
                                ]}
                                onPress={handleAdd}
                            >
                                <Text style={styles.addText}>ADD</Text>
                                <Ionicons name="add" size={16} color={Colors.primary} />
                            </Pressable>
                        ) : (
                            <View style={styles.quantityControls}>
                                <Pressable
                                    style={styles.quantityButton}
                                    onPress={handleRemove}
                                >
                                    <Ionicons name="remove" size={16} color={Colors.primary} />
                                </Pressable>
                                <Text style={styles.quantityText}>{localQuantity}</Text>
                                <Pressable
                                    style={styles.quantityButton}
                                    onPress={handleAdd}
                                >
                                    <Ionicons name="add" size={16} color={Colors.primary} />
                                </Pressable>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        shadowColor: Colors.shadow,
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },
    contentRow: {
        flexDirection: "row",
        gap: 12,
    },
    leftContent: {
        flex: 1,
    },
    rightContent: {
        width: 120,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 8,
    },
    vegIndicator: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    vegDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    bestsellerBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF7ED",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        gap: 3,
    },
    bestsellerText: {
        fontSize: 9,
        fontWeight: "700",
        color: "#F59E0B",
        letterSpacing: 0.5,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: 6,
        lineHeight: 22,
    },
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 6,
    },
    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.secondary,
    },
    ordersText: {
        fontSize: 11,
        color: Colors.muted,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.secondary,
    },
    originalPrice: {
        fontSize: 14,
        color: Colors.muted,
        textDecorationLine: "line-through",
    },
    discountBadge: {
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    discountText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#10B981",
    },
    description: {
        fontSize: 13,
        color: Colors.muted,
        lineHeight: 18,
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
    },
    spicyContainer: {
        flexDirection: "row",
        gap: 2,
    },
    spicyIcon: {
        fontSize: 12,
    },
    servesInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    servesText: {
        fontSize: 11,
        color: Colors.muted,
        fontWeight: "500",
    },
    customizableTag: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: Colors.primarySoft,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    customizableText: {
        fontSize: 11,
        fontWeight: "600",
        color: Colors.primary,
    },
    imageContainer: {
        position: "relative",
        width: "100%",
        height: 120,
        borderRadius: 12,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    addButton: {
        position: "absolute",
        bottom: -8,
        left: "50%",
        transform: [{ translateX: -40 }],
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 4,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        shadowColor: Colors.shadow,
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    addText: {
        fontSize: 13,
        fontWeight: "700",
        color: Colors.primary,
    },
    quantityControls: {
        position: "absolute",
        bottom: -8,
        left: "50%",
        transform: [{ translateX: -40 }],
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        shadowColor: Colors.shadow,
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    quantityButton: {
        width: 28,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    quantityText: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.primary,
        minWidth: 24,
        textAlign: "center",
    },
});