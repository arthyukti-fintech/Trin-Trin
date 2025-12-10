// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';

// import { useAuth } from '../context/AuthContext';
// import Button from '../components/common/Button';
// import OrderSummary from '../components/order/OrderSummary';
// import { useCart } from '../context/CartContext';

// type RootStackParamList = {
//   Checkout: undefined;
//   Menu: undefined;
// };

// type CartScreenNavigationProp = StackNavigationProp<RootStackParamList>;

// const CartScreen: React.FC = () => {
//   const navigation = useNavigation<CartScreenNavigationProp>();
//   const { items, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
//   const { authState } = useAuth();

//   const handleCheckout = () => {
//     if (!authState.isAuthenticated) {
//       Alert.alert('Login Required', 'Please login to proceed with checkout');
//       return;
//     }
    
//     if (items.length === 0) {
//       Alert.alert('Cart Empty', 'Please add items to cart before checkout');
//       return;
//     }
    
//     navigation.navigate('Checkout');
//   };

//   const handleRemoveItem = (itemId: string) => {
//     Alert.alert(
//       'Remove Item',
//       'Are you sure you want to remove this item?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Remove', onPress: () => removeFromCart(itemId) }
//       ]
//     );
//   };

//   if (items.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>Your cart is empty</Text>
//         <Button
//           title="Browse Menu"
//           onPress={() => navigation.navigate('Menu')}
//           style={styles.browseButton}
//         />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.itemsContainer}>
//         {items.map(cartItem => (
//           <View key={cartItem.foodItem.id} style={styles.cartItem}>
//             <View style={styles.itemInfo}>
//               <Text style={styles.itemName}>{cartItem.foodItem.name}</Text>
//               <Text style={styles.itemPrice}>
//                 ${(cartItem.foodItem.price * cartItem.quantity).toFixed(2)}
//               </Text>
//               <Text style={styles.itemDescription}>
//                 {cartItem.foodItem.description}
//               </Text>
//             </View>
            
//             <View style={styles.quantityContainer}>
//               <TouchableOpacity
//                 style={styles.quantityButton}
//                 onPress={() => updateQuantity(cartItem.foodItem.id, cartItem.quantity - 1)}
//               >
//                 <Text style={styles.quantityButtonText}>-</Text>
//               </TouchableOpacity>
              
//               <Text style={styles.quantityText}>{cartItem.quantity}</Text>
              
//               <TouchableOpacity
//                 style={styles.quantityButton}
//                 onPress={() => updateQuantity(cartItem.foodItem.id, cartItem.quantity + 1)}
//               >
//                 <Text style={styles.quantityButtonText}>+</Text>
//               </TouchableOpacity>
//             </View>
            
//             <TouchableOpacity
//               style={styles.removeButton}
//               onPress={() => handleRemoveItem(cartItem.foodItem.id)}
//             >
//               <Text style={styles.removeButtonText}>Remove</Text>
//             </TouchableOpacity>
//           </View>
//         ))}
        
//         <OrderSummary
//           subtotal={totalAmount}
//           deliveryFee={5.99}
//           tax={(totalAmount * 0.08)}
//         />
//       </ScrollView>
      
//       <View style={styles.checkoutContainer}>
//         <View style={styles.totalContainer}>
//           <Text style={styles.totalLabel}>Total:</Text>
//           <Text style={styles.totalAmount}>${(totalAmount + 5.99 + (totalAmount * 0.08)).toFixed(2)}</Text>
//         </View>
        
//         <View style={styles.buttonRow}>
//           <Button
//             title="Clear Cart"
//             onPress={clearCart}
//             variant="outline"
//             style={styles.clearButton}
//           />
//           <Button
//             title="Proceed to Checkout"
//             onPress={handleCheckout}
//             style={styles.checkoutButton}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyText: {
//     fontSize: 20,
//     color: '#666',
//     marginBottom: 20,
//   },
//   browseButton: {
//     width: 200,
//   },
//   itemsContainer: {
//     flex: 1,
//     padding: 15,
//   },
//   cartItem: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   itemInfo: {
//     marginBottom: 10,
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   itemPrice: {
//     fontSize: 16,
//     color: '#FF6B6B',
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   itemDescription: {
//     fontSize: 14,
//     color: '#666',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   quantityButton: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   quantityButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   quantityText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginHorizontal: 15,
//     color: '#333',
//   },
//   removeButton: {
//     alignSelf: 'flex-end',
//   },
//   removeButtonText: {
//     color: '#FF6B6B',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   checkoutContainer: {
//     padding: 15,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   totalLabel: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   totalAmount: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FF6B6B',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   clearButton: {
//     flex: 1,
//     marginRight: 10,
//   },
//   checkoutButton: {
//     flex: 2,
//   },
// });

// export default CartScreen;