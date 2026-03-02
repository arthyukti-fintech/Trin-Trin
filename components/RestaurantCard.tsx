import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors, Spacing } from "@/app/theme";
import OrderPopup from "@/app/OrderPopup";
import { DeliveryOption } from "./DeliveryOptionCard";
import DeliverySelection from "./DeliverySelectionModal";
import { calculateTrafficStatus, TrafficLight } from "./TrafficLight/TrafficLight";
import { useStartCallingMutation } from "@/redux/services/startcallingpostResApi";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH - 32;

type Props = {
    id: string;
    name: string;
    cuisine: string;
    address: string;
    rating: number;
    averageDeliveryTime: string;
    totalRatings: number;
    deliveryTime: string;
    isVegOnly?: boolean;
    isActive?: boolean;
    distance: string;
    priceForTwo: number;
    discount?: string;
    isVeg: boolean;
    image?: string;
    images?: string[];
    isFavorite?: boolean;
    onPress?: () => void;
    onCall?: () => void;
    // Optional traffic data from backend
    currentOrders?: number;
    maxCapacity?: number;
    isAcceptingOrders?: boolean;
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
    averageDeliveryTime,
    // Traffic data with defaults
    currentOrders = 3,
    maxCapacity = 10,
    isAcceptingOrders = true,
}: Props) {
    const [favorite, setFavorite] = useState(isFavorite);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const [orderPopupVisible, setOrderPopupVisible] = useState(false);
    const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
    const [orderData, setOrderData] = useState<any>(null);
    const [startCalling, { data, isLoading, error }] =
        useStartCallingMutation();
    const imageArray = images || (image ? [image] : []);

    // Convert distance string to number (e.g., "3.5 km" -> 3.5)
    const distanceInKm = parseFloat(distance.replace(/[^\d.]/g, '')) || 3.5;

    // Parse delivery time to number
    const estimatedDeliveryTime = parseInt(averageDeliveryTime) || 30;

    // Calculate traffic status
    const trafficStatus = calculateTrafficStatus(
        currentOrders,
        maxCapacity,
        isAcceptingOrders
    );

    const handleCallPress = async () => {
        try {
            console.log("Calling restaurant ID:", id);

            const res = await startCalling(id).unwrap();

            console.log("Call Success:", res);
        } catch (err) {
            console.log("Call Error:", err);
        }
    };

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
        }, 3000);

        return () => clearInterval(interval);
    }, [imageArray.length]);

    const toggleFavorite = () => {
        setFavorite(!favorite);
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 4.0) return "#10B981";
        if (rating >= 3.0) return "#F59E0B";
        return "#EF4444";
    };

    const menuCard = () => {
        router.push({
            pathname: "/menu/[restaurantId]",
            params: { restaurantId: id },
        });
    };

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / IMAGE_WIDTH);
        setCurrentIndex(index);
    };

    const handleOrderConfirm = () => {
        setOrderPopupVisible(false);
        setDeliveryModalVisible(true);
    };

    const handleDeliveryConfirm = (option: DeliveryOption, finalTotal: number) => {
        setDeliveryModalVisible(false);
        console.log("Selected Delivery Option:", option);
        console.log("Final Total:", finalTotal);
        console.log("Restaurant:", name);

        alert(
            `Order Confirmed!\n\nRestaurant: ${name}\nDelivery: ${option === "self" ? "Self Pickup" : "Home Delivery"}\nTotal: ₹${finalTotal.toFixed(2)}`
        );
    };

    const handleDeliveryClose = () => {
        setDeliveryModalVisible(false);
        setOrderPopupVisible(true);
    };

    return (
        <>
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

                    {discount && (
                        <View style={styles.discountBadge}>
                            <Ionicons name="pricetag" size={12} color="#fff" />
                            <Text style={styles.discountText}>{discount}</Text>
                        </View>
                    )}

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

                    <View style={[styles.vegBadge, { backgroundColor: isVeg ? "#10B981" : "#EF4444" }]}>
                        <View style={[styles.vegDot, { borderColor: isVeg ? "#10B981" : "#EF4444" }]}>
                            <View style={[styles.vegDotInner, { backgroundColor: isVeg ? "#10B981" : "#EF4444" }]} />
                        </View>
                    </View>
                </View>

                {/* Content Section */}
                <View style={styles.content}>
                    <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>

                        {/* Left Section - 80% */}
                        <View style={{ flex: 0.8 }}>
                            <Text style={styles.name} numberOfLines={1}>{name}</Text>
                            <Text style={styles.cuisine} numberOfLines={1}>{cuisine}</Text>

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

                            <View style={styles.addressRow}>
                                <Ionicons name="navigate-outline" size={14} color={Colors.muted} />
                                <Text style={styles.address} numberOfLines={1}>{address}</Text>
                            </View>
                        </View>

                        {/* Right Section - 20% Traffic Light */}
                        <View style={{ flex: 0.2, alignItems: 'center', marginLeft: 100 }}>
                            <TrafficLight status={trafficStatus} />
                        </View>

                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionRow}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.actionBtn,
                                styles.callBtn,
                                {
                                    transform: [{ scale: pressed ? 0.97 : 1 }],
                                    opacity: pressed ? 0.9 : 1,
                                },
                            ]}
                            onPress={handleCallPress}
                        >
                            <Ionicons name="call" size={18} color="#fff" />
                            <Text style={styles.callText}>Call</Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.actionBtn,
                                styles.menuBtn,
                                {
                                    transform: [{ scale: pressed ? 0.97 : 1 }],
                                    opacity: pressed ? 0.9 : 1,
                                },
                            ]}
                            onPress={menuCard}
                        >
                            <Text style={styles.menuText}>Menu</Text>
                            <Ionicons name="arrow-forward" size={14} color="#fff" />
                        </Pressable>
                    </View>
                </View>
            </Pressable>

            <OrderPopup
                visible={orderPopupVisible}
                order={orderData}
                onConfirm={handleOrderConfirm}
            />

            <DeliverySelection
                visible={deliveryModalVisible}
                order={orderData}
                distance={distanceInKm}
                onConfirm={handleDeliveryConfirm}
                onClose={handleDeliveryClose}
            />
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.background,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    nameSection: {
        flex: 1,
        marginRight: 12,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 30,
        gap: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    callBtn: {
        backgroundColor: Colors.accent,
    },
    callIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    callText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    callRipple: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 30,
    },
    whatsappBtn: {
        backgroundColor: '#25D366',
    },
    whatsappText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    menuBtn: {
        backgroundColor: Colors.primary,
    },
    menuText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
});