import GoBackArrow from '@/components/common/GoBackArrow';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  TextInput,
  Platform,
} from 'react-native';
import { Colors } from '../theme';
import { useOrderSocket } from "../socket/hooks/useOrderSocket";
import { useLocalSearchParams } from 'expo-router';
import { useGetMenuByRestaurantIdQuery } from '@/redux/services/getAllmenuofRestaurentApi';

function TakeOrders() {
  const { restaurantId } = useLocalSearchParams();
  const { data, isLoading, error } = useGetMenuByRestaurantIdQuery(restaurantId as string);

  // Transform API data into dish format
  const apiDishes = useMemo(() => {
    return data?.data?.menuList?.map((item: any) => ({
      id: item._id,
      name: item.menuName,
      price: `$${item.price}`,
      quantity: 0,
      selected: false,
      available: item.isAvailable,
    })) || [];
  }, [data]);

  // State for dishes and original list (for reset)
  const [dishes, setDishes] = useState<any[]>([]);
  const [originalDishes, setOriginalDishes] = useState<any[]>([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Animation values per dish (keyed by id for reliable access)
  const animatedValuesRef = useRef<Map<string, Animated.Value>>(new Map());
  const [, forceUpdate] = useState({});

  // Ensure Animated.Value exists for each dish
  useEffect(() => {
    if (apiDishes.length) {
      apiDishes.forEach((dish: any) => {
        if (!animatedValuesRef.current.has(dish.id)) {
          animatedValuesRef.current.set(dish.id, new Animated.Value(1));
        }
      });
      setOriginalDishes(apiDishes.map(d => ({ ...d }))); // copy
      setDishes(apiDishes.map(d => ({ ...d })));
    }
  }, [apiDishes]);

  // Socket listeners
  useOrderSocket({
    onOrderPlaced: (data: any) => {
      Alert.alert("Order Placed", "Order placed successfully!");
      // Reset to original dishes with zero quantities
      setDishes(originalDishes.map(d => ({ ...d, quantity: 0, selected: false })));
    },
    onOrderFailed: (data: any) => {
      Alert.alert("Order Failed", data?.message || "Try again");
    },
    onAvailabilityChanged: (data: any) => {
      setDishes(prev =>
        prev.map(dish =>
          dish.id === data.dishId
            ? { ...dish, selected: false, quantity: 0, available: data.available }
            : dish
        )
      );
    },
    onMenuUpdated: () => {
      console.log("Menu updated, refetch menu");
      // Optionally trigger refetch here if your query has a refetch method
    },
  });

  // Animation for main container slide-in
  const [slideAnim] = useState(new Animated.Value(0));
  const [orderButtonScale] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // Filter dishes based on search query
  const filteredDishes = useMemo(() => {
    if (!searchQuery.trim()) {
      return dishes.map((dish, originalIndex) => ({ ...dish, originalIndex }));
    }
    const query = searchQuery.toLowerCase().trim();
    return dishes
      .map((dish, originalIndex) => ({ ...dish, originalIndex }))
      .filter(dish => dish.name?.toLowerCase().includes(query) ?? false); // ✅ optional chaining
  }, [dishes, searchQuery]);

  // Helper to get animated value for a dish
  const getAnimatedValue = (dishId: string) => {
    if (!animatedValuesRef.current.has(dishId)) {
      animatedValuesRef.current.set(dishId, new Animated.Value(1));
    }
    return animatedValuesRef.current.get(dishId)!;
  };

  // Toggle selection with animation
  const toggleSelection = (dish: any) => {
    if (!dish.available) return;
    const anim = getAnimatedValue(dish.id);
    Animated.sequence([
      Animated.timing(anim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    setDishes(prev =>
      prev.map(d => (d.id === dish.id ? { ...d, selected: !d.selected } : d))
    );
  };

  // Increase quantity with animation
  const increaseQuantity = (dish: any) => {
    const anim = getAnimatedValue(dish.id);
    Animated.sequence([
      Animated.timing(anim, { toValue: 1.05, duration: 100, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    setDishes(prev =>
      prev.map(d => (d.id === dish.id ? { ...d, quantity: d.quantity + 1 } : d))
    );
  };

  // Decrease quantity with animation
  const decreaseQuantity = (dish: any) => {
    const anim = getAnimatedValue(dish.id);
    Animated.sequence([
      Animated.timing(anim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    setDishes(prev =>
      prev.map(d =>
        d.id === dish.id ? { ...d, quantity: Math.max(0, d.quantity - 1) } : d
      )
    );
  };

  // Handle place order
  const handlePlaceOrder = () => {
    const selectedDishes = dishes.filter(d => d.selected && d.quantity > 0);
    if (selectedDishes.length === 0) {
      Alert.alert('No Items Selected', 'Please select at least one dish with quantity.');
      return;
    }

    Animated.sequence([
      Animated.timing(orderButtonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(orderButtonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    const total = selectedDishes.reduce((sum, dish) => {
      const price = parseFloat(dish.price.replace('$', ''));
      return sum + price * dish.quantity;
    }, 0);

    let orderSummary = 'Order Summary:\n\n';
    selectedDishes.forEach(dish => {
      orderSummary += `${dish.name} x${dish.quantity} = $${(
        parseFloat(dish.price.replace('$', '')) * dish.quantity
      ).toFixed(2)}\n`;
    });
    orderSummary += `\nTotal: $${total.toFixed(2)}`;

    Alert.alert('Confirm Order', orderSummary, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Place Order',
        onPress: () => {
          // Reset after order placed – socket will also trigger but we handle locally
          setDishes(originalDishes.map(d => ({ ...d, quantity: 0, selected: false })));
          Alert.alert('Success', 'Order placed successfully!');
        },
      },
    ]);
  };

  // Calculate totals
  const getTotalItems = () => dishes.reduce((sum, d) => sum + d.quantity, 0);
  const getTotalPrice = () => {
    return dishes
      .filter(d => d.selected)
      .reduce((sum, d) => {
        const price = parseFloat(d.price.replace('$', ''));
        return sum + price * d.quantity;
      }, 0)
      .toFixed(2);
  };

  // Clear search
  const clearSearch = () => setSearchQuery('');

  return (
    <View style={styles.container}>
      <GoBackArrow />
      <Text style={styles.header}>Take Orders</Text>

      {/* Summary Card */}
      <Animated.View
        style={[
          styles.summaryCard,
          {
            opacity: slideAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Items</Text>
          <Text style={styles.summaryValue}>{getTotalItems()}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Price</Text>
          <Text style={styles.summaryValue}>${getTotalPrice()}</Text>
        </View>
      </Animated.View>

      {/* Professional Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search dishes..."
            placeholderTextColor="#95a5a6"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing" // iOS clear button
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.dishesContainer}>
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => {
              const animValue = getAnimatedValue(dish.id);
              return (
                <Animated.View
                  key={dish.id}
                  style={[
                    styles.dishCard,
                    {
                      opacity: slideAnim,
                      transform: [
                        { scale: animValue },
                        {
                          translateX: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-50, 0],
                          }),
                        },
                      ],
                    },
                    dish.selected && styles.dishCardSelected,
                    !dish.available && styles.dishCardUnavailable,
                  ]}
                >
                  <TouchableOpacity
                    style={styles.dishContent}
                    onPress={() => toggleSelection(dish)}
                    activeOpacity={0.7}
                    disabled={!dish.available}
                  >
                    {/* Checkbox */}
                    <View
                      style={[
                        styles.checkbox,
                        dish.selected && styles.checkboxSelected,
                        !dish.available && styles.checkboxDisabled,
                      ]}
                    >
                      {dish.selected && <Text style={styles.checkmark}>✓</Text>}
                    </View>

                    {/* Dish Info */}
                    <View style={styles.dishInfo}>
                      <Text style={[styles.dishName, !dish.available && styles.textDisabled]}>
                        {dish.name}
                      </Text>
                      <Text style={[styles.dishPrice, !dish.available && styles.textDisabled]}>
                        {dish.price}
                      </Text>
                      <Text
                        style={[
                          styles.availabilityText,
                          { color: dish.available ? '#27ae60' : '#e74c3c' },
                        ]}
                      >
                        {dish.available ? 'Available' : 'Not Available'}
                      </Text>
                    </View>

                    {/* Quantity Badge */}
                    {dish.quantity > 0 && (
                      <View style={styles.quantityBadge}>
                        <Text style={styles.quantityBadgeText}>{dish.quantity}</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  {/* Quantity Controls */}
                  {dish.selected && dish.available && (
                    <Animated.View
                      style={[
                        styles.quantityControls,
                        { opacity: slideAnim },
                      ]}
                    >
                      <TouchableOpacity
                        style={[
                          styles.quantityButton,
                          dish.quantity === 0 && styles.quantityButtonDisabled,
                        ]}
                        onPress={() => decreaseQuantity(dish)}
                        disabled={dish.quantity === 0}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.quantityButtonText}>−</Text>
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>{dish.quantity}</Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => increaseQuantity(dish)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  )}
                </Animated.View>
              );
            })
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No dishes found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <Animated.View
        style={[
          styles.orderButtonContainer,
          { transform: [{ scale: orderButtonScale }] },
        ]}
      >
        <TouchableOpacity
          style={styles.orderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.8}
        >
          <Text style={styles.orderButtonText}>PLACE ORDER</Text>
          {getTotalItems() > 0 && (
            <View style={styles.orderButtonBadge}>
              <Text style={styles.orderButtonBadgeText}>{getTotalItems()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default TakeOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentSoft,
    padding: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#2c3e50',
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#ecf0f1',
    marginHorizontal: 15,
  },
  // Search Bar Styles
  searchContainer: {
    marginBottom: 16,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#95a5a6',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    paddingVertical: 12,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#95a5a6',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  dishesContainer: {
    paddingBottom: 20,
  },
  dishCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dishCardSelected: {
    borderColor: '#3498db',
    backgroundColor: '#ebf5fb',
  },
  dishCardUnavailable: {
    opacity: 0.7,
    backgroundColor: '#f8f9fa',
  },
  dishContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#bdc3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkboxSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  checkboxDisabled: {
    borderColor: '#e0e0e0',
    backgroundColor: '#ecf0f1',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  dishPrice: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  availabilityText: {
    fontSize: 12,
    marginTop: 4,
  },
  textDisabled: {
    color: '#bdc3c7',
  },
  quantityBadge: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  quantityBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  quantityButtonDisabled: {
    backgroundColor: '#bdc3c7',
    shadowColor: '#bdc3c7',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    minWidth: 40,
    textAlign: 'center',
  },
  orderButtonContainer: {
    marginTop: 10,
  },
  orderButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#f39c12',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    flexDirection: 'row',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  orderButtonBadge: {
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginLeft: 10,
  },
  orderButtonBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noResultsContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#95a5a6',
  },
});