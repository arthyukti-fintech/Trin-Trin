import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    SafeAreaView,
    StatusBar
} from "react-native";
import BackHeader from "../components/BackHeader";

// Theme
const Colors = {
    primary: "#FF6B35",
    primarySoft: "#FFE8E0",
    secondary: "#1F2937",
    card: "#FFFFFF",
    background: "#F9FAFB",
    muted: "#6B7280",
    border: "#E5E7EB",
    shadow: "#000000",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
};

const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

// Icons Component (Simple SVG replacement)
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

// Static Restaurant Data
const restaurantData = {
    id: "1",
    name: "The Spice Garden",
    cuisine: "North Indian, Chinese, Continental",
    address: "HSR Layout, Sector 2, Bangalore",
    rating: 4.5,
    totalRatings: 2500,
    deliveryTime: "30-35 min",
    distance: "2.5 km",
    priceForTwo: 600,
    isVeg: false,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    description: "Experience authentic Indian flavors with a modern twist. Our chefs bring decades of culinary expertise to every dish.",
    openTime: "11:00 AM - 11:00 PM",
    offers: ["50% off up to ₹100", "Free delivery on orders above ₹299"],
};

const menuData = [
    {
        id: "1",
        category: "Starters",
        items: [
            {
                id: "s1",
                name: "Paneer Tikka",
                description: "Cottage cheese marinated in spices and grilled to perfection",
                price: 280,
                isVeg: true,
                isBestseller: true,
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400",
            },
            {
                id: "s2",
                name: "Chicken Wings",
                description: "Crispy wings tossed in spicy peri-peri sauce",
                price: 320,
                isVeg: false,
                isBestseller: true,
                rating: 4.4,
                image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400",
            },
            {
                id: "s3",
                name: "Mushroom Pepper Fry",
                description: "Button mushrooms sautéed with crushed pepper and herbs",
                price: 240,
                isVeg: true,
                rating: 4.3,
                image: "https://images.unsplash.com/photo-1621863349963-ff0b0a0bff7b?w=400",
            },
        ],
    },
    {
        id: "2",
        category: "Main Course",
        items: [
            {
                id: "m1",
                name: "Butter Chicken",
                description: "Tender chicken in rich tomato and cream gravy",
                price: 380,
                isVeg: false,
                isBestseller: true,
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
            },
            {
                id: "m2",
                name: "Dal Makhani",
                description: "Black lentils slow cooked overnight with butter and cream",
                price: 260,
                isVeg: true,
                isBestseller: true,
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400",
            },
            {
                id: "m3",
                name: "Biryani",
                description: "Aromatic basmati rice with chicken and spices",
                price: 340,
                isVeg: false,
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
            },
            {
                id: "m4",
                name: "Paneer Butter Masala",
                description: "Cottage cheese cubes in rich tomato and cashew gravy",
                price: 300,
                isVeg: true,
                rating: 4.4,
                image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
            },
        ],
    },
    {
        id: "3",
        category: "Breads",
        items: [
            {
                id: "b1",
                name: "Butter Naan",
                description: "Soft leavened bread with butter",
                price: 50,
                isVeg: true,
                rating: 4.3,
                image: "https://images.unsplash.com/photo-1619897593385-51a3db1c3460?w=400",
            },
            {
                id: "b2",
                name: "Garlic Naan",
                description: "Naan topped with fresh garlic and coriander",
                price: 60,
                isVeg: true,
                isBestseller: true,
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1600690393370-0fc4d8cc08c9?w=400",
            },
        ],
    },
    {
        id: "4",
        category: "Desserts",
        items: [
            {
                id: "d1",
                name: "Gulab Jamun",
                description: "Traditional milk dumplings in sugar syrup",
                price: 120,
                isVeg: true,
                rating: 4.4,
                image: "https://images.unsplash.com/photo-1589217157232-464b505b197f?w=400",
            },
            {
                id: "d2",
                name: "Chocolate Browniee",
                description: "Warm brownie with vanilla ice cream",
                price: 180,
                isVeg: true,
                isBestseller: true,
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400",
            },
        ],
    },
];


export default function RestaurantApp() {
    const [currentScreen, setCurrentScreen] = useState("details");
    const [cart, setCart] = useState([]);
    const [favorite, setFavorite] = useState(false);

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId) => {
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem.quantity === 1) {
            setCart(cart.filter(cartItem => cartItem.id !== itemId));
        } else {
            setCart(cart.map(cartItem =>
                cartItem.id === itemId
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            ));
        }
    };

    const getCartItemQuantity = (itemId) => {
        const item = cart.find(cartItem => cartItem.id === itemId);
        return item ? item.quantity : 0;
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            {currentScreen === "details" && (
                <RestaurantDetails
                    restaurant={restaurantData}
                    menu={menuData}
                    onNavigateToCart={() => setCurrentScreen("cart")}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    getCartItemQuantity={getCartItemQuantity}
                    cartCount={cartCount}
                    favorite={favorite}
                    setFavorite={setFavorite}
                />
            )}
            {currentScreen === "cart" && (
                <CartScreen
                    cart={cart}
                    onBack={() => setCurrentScreen("details")}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    cartTotal={cartTotal}
                    onCheckout={() => setCurrentScreen("checkout")}
                />
            )}
            {currentScreen === "checkout" && (
                <CheckoutScreen
                    cart={cart}
                    cartTotal={cartTotal}
                    onBack={() => setCurrentScreen("cart")}
                    restaurant={restaurantData}
                />
            )}
        </SafeAreaView>
    );
}

// Restaurant Details Screen
function RestaurantDetails({
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

// Menu Item Component
function MenuItem({ item, onAdd, onRemove, quantity }) {
    return (
        <View style={styles.menuItem}>
            <View style={styles.menuItemContent}>
                <View style={styles.menuItemInfo}>
                    <View style={styles.vegIndicator}>
                        <View style={[styles.vegDot, { borderColor: item.isVeg ? Colors.success : Colors.danger }]}>
                            <View style={[styles.vegDotInner, { backgroundColor: item.isVeg ? Colors.success : Colors.danger }]} />
                        </View>
                    </View>

                    {item.isBestseller && (
                        <View style={styles.bestsellerBadge}>
                            <Icon name="flame" size={12} color={Colors.warning} />
                            <Text style={styles.bestsellerText}>Bestseller</Text>
                        </View>
                    )}

                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemDescription} numberOfLines={2}>
                        {item.description}
                    </Text>

                    <View style={styles.menuItemFooter}>
                        <Text style={styles.menuItemPrice}>₹{item.price}</Text>
                        {item.rating && (
                            <View style={styles.itemRating}>
                                <Icon name="star" size={12} color={Colors.warning} />
                                <Text style={styles.itemRatingText}>{item.rating}</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.menuItemImageContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.menuItemImage}
                    />
                    {quantity === 0 ? (
                        <Pressable style={styles.addButton} onPress={onAdd}>
                            <Text style={styles.addButtonText}>ADD</Text>
                        </Pressable>
                    ) : (
                        <View style={styles.quantityControl}>
                            <Pressable style={styles.quantityButton} onPress={onRemove}>
                                <Icon name="remove" size={16} color={Colors.primary} />
                            </Pressable>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <Pressable style={styles.quantityButton} onPress={onAdd}>
                                <Icon name="add" size={16} color={Colors.primary} />
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

// Cart Screen
function CartScreen({ cart, onBack, addToCart, removeFromCart, cartTotal, onCheckout }) {
    const deliveryFee = 40;
    const gst = Math.round(cartTotal * 0.05);
    const totalAmount = cartTotal + deliveryFee + gst;

    return (
        <View style={styles.screenContainer}>
            {/* Header */}
            <View style={styles.cartHeader}>
                <Pressable onPress={onBack} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.secondary} />
                </Pressable>
                <Text style={styles.cartHeaderTitle}>Cart ({cart.length} items)</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.cartScrollView}>
                {/* Cart Items */}
                <View style={styles.cartItems}>
                    {cart.map(item => (
                        <View key={item.id} style={styles.cartItem}>
                            <View style={styles.vegIndicator}>
                                <View style={[styles.vegDot, { borderColor: item.isVeg ? Colors.success : Colors.danger }]}>
                                    <View style={[styles.vegDotInner, { backgroundColor: item.isVeg ? Colors.success : Colors.danger }]} />
                                </View>
                            </View>

                            <View style={styles.cartItemInfo}>
                                <Text style={styles.cartItemName}>{item.name}</Text>
                                <Text style={styles.cartItemPrice}>₹{item.price}</Text>
                            </View>

                            <View style={styles.cartQuantityControl}>
                                <Pressable
                                    style={styles.cartQuantityButton}
                                    onPress={() => removeFromCart(item.id)}
                                >
                                    <Icon name="remove" size={14} color={Colors.primary} />
                                </Pressable>
                                <Text style={styles.cartQuantityText}>{item.quantity}</Text>
                                <Pressable
                                    style={styles.cartQuantityButton}
                                    onPress={() => addToCart(item)}
                                >
                                    <Icon name="add" size={14} color={Colors.primary} />
                                </Pressable>
                            </View>

                            <Text style={styles.cartItemTotal}>₹{item.price * item.quantity}</Text>
                        </View>
                    ))}
                </View>

                {/* Bill Details */}
                <View style={styles.billCard}>
                    <Text style={styles.billTitle}>Bill Details</Text>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Item Total</Text>
                        <Text style={styles.billValue}>₹{cartTotal}</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Delivery Fee</Text>
                        <Text style={styles.billValue}>₹{deliveryFee}</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>GST (5%)</Text>
                        <Text style={styles.billValue}>₹{gst}</Text>
                    </View>
                    <View style={styles.billDivider} />
                    <View style={styles.billRow}>
                        <Text style={styles.billTotalLabel}>To Pay</Text>
                        <Text style={styles.billTotalValue}>₹{totalAmount}</Text>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Checkout Button */}
            <View style={styles.checkoutFooter}>
                <View style={styles.footerTotal}>
                    <Text style={styles.footerTotalLabel}>Total</Text>
                    <Text style={styles.footerTotalValue}>₹{totalAmount}</Text>
                </View>
                <Pressable style={styles.checkoutButton} onPress={onCheckout}>
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </Pressable>
            </View>
        </View>
    );
}

// Checkout Screen
function CheckoutScreen({ cart, cartTotal, onBack, restaurant }) {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const deliveryFee = 40;
    const gst = Math.round(cartTotal * 0.05);
    const totalAmount = cartTotal + deliveryFee + gst;

    if (orderPlaced) {
        return (
            <View style={styles.successContainer}>
                <View style={styles.successContent}>
                    <View style={styles.successIcon}>
                        <Icon name="check" size={48} color={Colors.success} />
                    </View>
                    <Text style={styles.successTitle}>Order Placed Successfully!</Text>
                    <Text style={styles.successMessage}>
                        Your order has been confirmed and will be delivered in {restaurant.deliveryTime}
                    </Text>
                    <View style={styles.orderSummary}>
                        <Text style={styles.orderLabel}>Order ID</Text>
                        <Text style={styles.orderValue}>#ORD{Math.floor(Math.random() * 100000)}</Text>
                    </View>
                    <View style={styles.orderSummary}>
                        <Text style={styles.orderLabel}>Total Amount</Text>
                        <Text style={styles.orderValue}>₹{totalAmount}</Text>
                    </View>
                    <Pressable style={styles.trackButton}>
                        <Text style={styles.trackButtonText}>Track Order</Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.cartHeader}>
                <Pressable onPress={onBack} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.secondary} />
                </Pressable>
                <Text style={styles.cartHeaderTitle}>Checkout</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.checkoutScroll}>
                {/* Delivery Address */}
                <View style={styles.checkoutCard}>
                    <Text style={styles.checkoutCardTitle}>Delivery Address</Text>
                    <View style={styles.addressCard}>
                        <Icon name="location" size={20} color={Colors.primary} />
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressType}>Home</Text>
                            <Text style={styles.addressText}>
                                123, MG Road, Bangalore, Karnataka 560001
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.checkoutCard}>
                    <Text style={styles.checkoutCardTitle}>Payment Method</Text>
                    <View style={styles.paymentOption}>
                        <View style={styles.radioOuter}>
                            <View style={styles.radioInner} />
                        </View>
                        <Text style={styles.paymentText}>Cash on Delivery</Text>
                    </View>
                </View>

                {/* Order Summary */}
                <View style={styles.checkoutCard}>
                    <Text style={styles.checkoutCardTitle}>Order Summary</Text>
                    {cart.map(item => (
                        <View key={item.id} style={styles.summaryItem}>
                            <Text style={styles.summaryItemName}>
                                {item.name} × {item.quantity}
                            </Text>
                            <Text style={styles.summaryItemPrice}>
                                ₹{item.price * item.quantity}
                            </Text>
                        </View>
                    ))}
                    <View style={styles.billDivider} />
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryTotal}>Total</Text>
                        <Text style={styles.summaryTotalValue}>₹{totalAmount}</Text>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.checkoutFooter}>
                <Pressable
                    style={styles.placeOrderButton}
                    onPress={() => setOrderPlaced(true)}
                >
                    <Text style={styles.placeOrderButtonText}>Place Order • ₹{totalAmount}</Text>
                </Pressable>
            </View>
        </View>
    );
}

// Styles
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