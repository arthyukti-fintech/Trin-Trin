
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing } from "../theme";
import BackHeader from "../components/BackHeader";

// ============================================
// MENU SCREEN COMPONENT
// ============================================
type MenuScreenProps = {
    restaurantName?: string;
};

export default function MenuScreen({ restaurantName = "Restaurant" }: MenuScreenProps) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages"];

    const menuData = [
        // Starters
        {
            id: "1",
            category: "Starters",
            name: "Paneer Tikka",
            description: "Marinated cottage cheese cubes grilled to perfection with bell peppers",
            price: 249,
            image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400",
            isVeg: true,
            isBestseller: true,
            spicyLevel: 2,
        },
        {
            id: "2",
            category: "Starters",
            name: "Chicken Malai Tikka",
            description: "Creamy chicken pieces marinated in cheese and aromatic spices",
            price: 299,
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
            isVeg: false,
            isBestseller: true,
            spicyLevel: 1,
        },
        {
            id: "3",
            category: "Starters",
            name: "Crispy Corn",
            description: "Golden fried corn kernels tossed with spices and herbs",
            price: 189,
            image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400",
            isVeg: true,
            isBestseller: false,
            spicyLevel: 1,
        },
        // Main Course
        {
            id: "4",
            category: "Main Course",
            name: "Butter Chicken",
            description: "Tender chicken in rich tomato gravy with butter and cream",
            price: 349,
            image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
            isVeg: false,
            isBestseller: true,
            spicyLevel: 1,
        },
        {
            id: "5",
            category: "Main Course",
            name: "Dal Makhani",
            description: "Creamy black lentils slow-cooked overnight with spices",
            price: 249,
            image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400",
            isVeg: true,
            isBestseller: true,
            spicyLevel: 0,
        },
        {
            id: "6",
            category: "Main Course",
            name: "Biryani",
            description: "Fragrant basmati rice cooked with aromatic spices and meat",
            price: 399,
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
            isVeg: false,
            isBestseller: true,
            spicyLevel: 2,
        },
        {
            id: "7",
            category: "Main Course",
            name: "Palak Paneer",
            description: "Soft paneer cubes in creamy spinach gravy with spices",
            price: 269,
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
            isVeg: true,
            isBestseller: false,
            spicyLevel: 1,
        },
        // Desserts
        {
            id: "8",
            category: "Desserts",
            name: "Gulab Jamun",
            description: "Soft milk solid dumplings soaked in rose-flavored sugar syrup",
            price: 99,
            image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
            isVeg: true,
            isBestseller: true,
            spicyLevel: 0,
        },
        {
            id: "9",
            category: "Desserts",
            name: "Chocolate Brownie",
            description: "Rich chocolate brownie topped with vanilla ice cream",
            price: 149,
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
            isVeg: true,
            isBestseller: true,
            spicyLevel: 0,
        },
        {
            id: "10",
            category: "Desserts",
            name: "Rasmalai",
            description: "Soft cheese patties soaked in sweetened, thickened milk",
            price: 129,
            image: "https://images.unsplash.com/photo-1589227365533-cee0c8b4b85e?w=400",
            isVeg: true,
            isBestseller: false,
            spicyLevel: 0,
        },
        // Beverages
        {
            id: "11",
            category: "Beverages",
            name: "Fresh Lime Soda",
            description: "Refreshing lime juice with soda and a hint of mint",
            price: 79,
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
            isVeg: true,
            isBestseller: false,
            spicyLevel: 0,
        },
        {
            id: "12",
            category: "Beverages",
            name: "Mango Lassi",
            description: "Creamy yogurt drink blended with fresh mango pulp",
            price: 99,
            image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400",
            isVeg: true,
            isBestseller: true,
            spicyLevel: 0,
        },
    ];

    const filteredMenu = selectedCategory === "All"
        ? menuData
        : menuData.filter(item => item.category === selectedCategory);

    const renderSpicyIcons = (level: number) => {
        if (level === 0) return null;
        return (
            <View style={styles.spicyContainer}>
                {[...Array(level)].map((_, i) => (
                    <Text key={i} style={styles.spicyIcon}>🌶️</Text>
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader title={"Menu"} />

            {/* Category Tabs */}
            <View style={styles.categoriesWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {categories.map((category) => (
                        <Pressable
                            key={category}
                            onPress={() => setSelectedCategory(category)}
                            style={[
                                styles.categoryTab,
                                selectedCategory === category && styles.categoryTabActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === category && styles.categoryTextActive,
                                ]}
                            >
                                {category}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/* Menu Items */}
            <ScrollView
                style={styles.menuList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.menuScrollContent}
            >
                {filteredMenu.map((item) => (
                    <View key={item.id} style={styles.menuCard}>
                        {/* Image */}
                        <View style={styles.imageWrapper}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.menuImage}
                                resizeMode="cover"
                            />
                            {item.isBestseller && (
                                <View style={styles.bestsellerTag}>
                                    <Ionicons name="star" size={12} color="#fff" />
                                    <Text style={styles.bestsellerTagText}>BESTSELLER</Text>
                                </View>
                            )}
                            <View style={[styles.vegBadge, { backgroundColor: item.isVeg ? "#10B981" : "#EF4444" }]}>
                                <View style={[styles.vegDot, { borderColor: item.isVeg ? "#10B981" : "#EF4444" }]}>
                                    <View style={[styles.vegDotInner, { backgroundColor: item.isVeg ? "#10B981" : "#EF4444" }]} />
                                </View>
                            </View>
                        </View>

                        {/* Content */}
                        <View style={styles.menuCardContent}>
                            <View style={styles.menuCardHeader}>
                                <Text style={styles.menuItemName}>{item.name}</Text>
                                {renderSpicyIcons(item.spicyLevel)}
                            </View>
                            <Text style={styles.menuItemDescription} numberOfLines={2}>
                                {item.description}
                            </Text>
                            <View style={styles.priceTag}>
                                <Text style={styles.menuItemPrice}>₹{item.price}</Text>
                            </View>
                        </View>
                    </View>
                ))}

                {/* Footer Info */}
                <View style={styles.footer}>
                    <View style={styles.footerItem}>
                        <View style={styles.vegIndicatorLegend}>
                            <View style={styles.vegDotLegend} />
                        </View>
                        <Text style={styles.footerText}>Vegetarian</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <View style={[styles.vegIndicatorLegend, { borderColor: "#EF4444" }]}>
                            <View style={[styles.vegDotLegend, { backgroundColor: "#EF4444" }]} />
                        </View>
                        <Text style={styles.footerText}>Non-Vegetarian</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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