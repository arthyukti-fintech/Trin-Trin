// import { Pressable, ScrollView, Text, View } from "react-native";
// import Icon from "../components/Icon";
// import { styles } from "../theme/styles";
// import { Colors } from "../theme";
// export function CartScreen({ cart, onBack, addToCart, removeFromCart, cartTotal, onCheckout }) {
//     const deliveryFee = 40;
//     const gst = Math.round(cartTotal * 0.05);
//     const totalAmount = cartTotal + deliveryFee + gst;

//     return (
//         <View style={styles.screenContainer}>
//             {/* Header */}
//             <View style={styles.cartHeader}>
//                 <Pressable onPress={onBack} style={styles.backButton}>
//                     <Icon name="arrow-back" size={24} color={Colors.secondary} />
//                 </Pressable>
//                 <Text style={styles.cartHeaderTitle}>Cart ({cart.length} items)</Text>
//                 <View style={{ width: 40 }} />
//             </View>

//             <ScrollView style={styles.cartScrollView}>
//                 {/* Cart Items */}
//                 <View style={styles.cartItems}>
//                     {cart.map(item => (
//                         <View key={item.id} style={styles.cartItem}>
//                             <View style={styles.vegIndicator}>
//                                 <View style={[styles.vegDot, { borderColor: item.isVeg ? Colors.success : Colors.danger }]}>
//                                     <View style={[styles.vegDotInner, { backgroundColor: item.isVeg ? Colors.success : Colors.danger }]} />
//                                 </View>
//                             </View>

//                             <View style={styles.cartItemInfo}>
//                                 <Text style={styles.cartItemName}>{item.name}</Text>
//                                 <Text style={styles.cartItemPrice}>₹{item.price}</Text>
//                             </View>

//                             <View style={styles.cartQuantityControl}>
//                                 <Pressable
//                                     style={styles.cartQuantityButton}
//                                     onPress={() => removeFromCart(item.id)}
//                                 >
//                                     <Icon name="remove" size={14} color={Colors.primary} />
//                                 </Pressable>
//                                 <Text style={styles.cartQuantityText}>{item.quantity}</Text>
//                                 <Pressable
//                                     style={styles.cartQuantityButton}
//                                     onPress={() => addToCart(item)}
//                                 >
//                                     <Icon name="add" size={14} color={Colors.primary} />
//                                 </Pressable>
//                             </View>

//                             <Text style={styles.cartItemTotal}>₹{item.price * item.quantity}</Text>
//                         </View>
//                     ))}
//                 </View>

//                 {/* Bill Details */}
//                 <View style={styles.billCard}>
//                     <Text style={styles.billTitle}>Bill Details</Text>
//                     <View style={styles.billRow}>
//                         <Text style={styles.billLabel}>Item Total</Text>
//                         <Text style={styles.billValue}>₹{cartTotal}</Text>
//                     </View>
//                     <View style={styles.billRow}>
//                         <Text style={styles.billLabel}>Delivery Fee</Text>
//                         <Text style={styles.billValue}>₹{deliveryFee}</Text>
//                     </View>
//                     <View style={styles.billRow}>
//                         <Text style={styles.billLabel}>GST (5%)</Text>
//                         <Text style={styles.billValue}>₹{gst}</Text>
//                     </View>
//                     <View style={styles.billDivider} />
//                     <View style={styles.billRow}>
//                         <Text style={styles.billTotalLabel}>To Pay</Text>
//                         <Text style={styles.billTotalValue}>₹{totalAmount}</Text>
//                     </View>
//                 </View>

//                 <View style={{ height: 100 }} />
//             </ScrollView>

//             {/* Checkout Button */}
//             <View style={styles.checkoutFooter}>
//                 <View style={styles.footerTotal}>
//                     <Text style={styles.footerTotalLabel}>Total</Text>
//                     <Text style={styles.footerTotalValue}>₹{totalAmount}</Text>
//                 </View>
//                 <Pressable style={styles.checkoutButton} onPress={onCheckout}>
//                     <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
//                 </Pressable>
//             </View>
//         </View>
//     );
// }