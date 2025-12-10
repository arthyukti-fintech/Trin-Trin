import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../theme";
import { router } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH - 32; // Accounting for card padding

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
    image?: string; // Support old single image prop
    images?: string[]; // Support new multiple images prop
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
    images,
    isFavorite = false,
    onPress,
    onCall,
}: Props) {
    const [favorite, setFavorite] = useState(isFavorite);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    // Convert single image to array if images prop not provided
    const imageArray = images || (image ? [image] : []);

    // Auto-slide effect
    useEffect(() => {
        if (imageArray.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % imageArray.length;
                scrollViewRef.current?.scrollTo({
                    x: nextIndex * IMAGE_WIDTH,
                    animated: true,
                });
                return nextIndex;
            });
        }, 3000); // Slides every 3 seconds

        return () => clearInterval(interval);
    }, [imageArray.length]);

    const toggleFavorite = () => {
        setFavorite(!favorite);
        // Here you can add logic to save to backend/storage
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 4.0) return "#10B981";
        if (rating >= 3.0) return "#F59E0B";
        return "#EF4444";
    };

    const menuCard = () => {
        router.push("/MenuCard");
    };

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / IMAGE_WIDTH);
        setCurrentIndex(index);
    };

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                { opacity: pressed ? 0.95 : 1 },
            ]}
        >
            {/* Image Slider Section */}
            <View style={styles.imageContainer}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                    scrollEventThrottle={16}
                >
                    {imageArray.map((img, index) => (
                        <Image
                            key={index}
                            source={typeof img === 'string' ? { uri: img } : img}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>

                {/* Pagination Dots */}
                {imageArray.length > 1 && (
                    <View style={styles.pagination}>
                        {imageArray.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    currentIndex === index && styles.paginationDotActive,
                                ]}
                            />
                        ))}
                    </View>
                )}

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

                {/* Address */}
                <View style={styles.addressRow}>
                    <Ionicons name="navigate-outline" size={14} color={Colors.muted} />
                    <Text style={styles.address} numberOfLines={1}>{address}</Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionRow}>
                    {/* 📞 Call */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.actionBtn,
                            styles.callBtn,
                            { opacity: pressed ? 0.8 : 1 },
                        ]}
                        onPress={onCall}
                    >
                        <Ionicons name="call" size={16} color={Colors.primary} />
                        <Text style={styles.callText}>Call</Text>
                    </Pressable>

                    {/* 💬 WhatsApp */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.actionBtn,
                            styles.whatsappBtn,
                            { opacity: pressed ? 0.85 : 1 },
                        ]}
                    // onPress={onWhatsApp}
                    >
                        <Ionicons name="logo-whatsapp" size={16} color="#fff" />
                        <Text style={styles.whatsappText}>WhatsApp</Text>
                    </Pressable>

                    {/* 📋 Menu */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.actionBtn,
                            styles.menuBtn,
                            { opacity: pressed ? 0.9 : 1 },
                        ]}
                        onPress={menuCard}
                    >
                        <Text style={styles.menuText}>Menu </Text>
                        <Ionicons name="arrow-forward" size={14} color="#fff" />
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
        width: IMAGE_WIDTH,
        height: 180,
    },
    pagination: {
        position: "absolute",
        bottom: 8,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },
    paginationDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    paginationDotActive: {
        backgroundColor: "#fff",
        width: 20,
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
    actionBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingVertical: 12,
        borderRadius: 12,
    },
    callBtn: {
        backgroundColor: Colors.primarySoft,
        borderWidth: 1.5,
        borderColor: Colors.primary,
         fontSize: 12,
    },
    whatsappBtn: {
        backgroundColor: "#25D366",
       
        
    },
    whatsappText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
    menuBtn: {
        backgroundColor: Colors.primary,
    },
    menuText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
});