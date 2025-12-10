// import { Pressable, Text, View } from "react-native";
// import { useState } from "react";
// import Icon from "@/components/Icon";
// import { Colors } from "../theme";
// import { ScrollView } from "react-native-gesture-handler";

// export function CheckoutScreen({ cart, cartTotal, onBack, restaurant }) {
//     const [orderPlaced, setOrderPlaced] = useState(false);
//     const deliveryFee = 40;
//     const gst = Math.round(cartTotal * 0.05);
//     const totalAmount = cartTotal + deliveryFee + gst;

//     if (orderPlaced) {
//         return (
//             <View style={styles.successContainer}>
//                 <View style={styles.successContent}>
//                     <View style={styles.successIcon}>
//                         <Icon name="check" size={48} color={Colors.success} />
//                     </View>
//                     <Text style={styles.successTitle}>Order Placed Successfully!</Text>
//                     <Text style={styles.successMessage}>
//                         Your order has been confirmed and will be delivered in {restaurant.deliveryTime}
//                     </Text>
//                     <View style={styles.orderSummary}>
//                         <Text style={styles.orderLabel}>Order ID</Text>
//                         <Text style={styles.orderValue}>#ORD{Math.floor(Math.random() * 100000)}</Text>
//                     </View>
//                     <View style={styles.orderSummary}>
//                         <Text style={styles.orderLabel}>Total Amount</Text>
//                         <Text style={styles.orderValue}>₹{totalAmount}</Text>
//                     </View>
//                     <Pressable style={styles.trackButton}>
//                         <Text style={styles.trackButtonText}>Track Order</Text>
//                     </Pressable>
//                 </View>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.screenContainer}>
//             <View style={styles.cartHeader}>
//                 <Pressable onPress={onBack} style={styles.backButton}>
//                     <Icon name="arrow-back" size={24} color={Colors.secondary} />
//                 </Pressable>
//                 <Text style={styles.cartHeaderTitle}>Checkout</Text>
//                 <View style={{ width: 40 }} />
//             </View>

//             <ScrollView style={styles.checkoutScroll}>
//                 {/* Delivery Address */}
//                 <View style={styles.checkoutCard}>
//                     <Text style={styles.checkoutCardTitle}>Delivery Address</Text>
//                     <View style={styles.addressCard}>
//                         <Icon name="location" size={20} color={Colors.primary} />
//                         <View style={styles.addressInfo}>
//                             <Text style={styles.addressType}>Home</Text>
//                             <Text style={styles.addressText}>
//                                 123, MG Road, Bangalore, Karnataka 560001
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Payment Method */}
//                 <View style={styles.checkoutCard}>
//                     <Text style={styles.checkoutCardTitle}>Payment Method</Text>
//                     <View style={styles.paymentOption}>
//                         <View style={styles.radioOuter}>
//                             <View style={styles.radioInner} />
//                         </View>
//                         <Text style={styles.paymentText}>Cash on Delivery</Text>
//                     </View>
//                 </View>

//                 {/* Order Summary */}
//                 <View style={styles.checkoutCard}>
//                     <Text style={styles.checkoutCardTitle}>Order Summary</Text>
//                     {cart.map(item => (
//                         <View key={item.id} style={styles.summaryItem}>
//                             <Text style={styles.summaryItemName}>
//                                 {item.name} × {item.quantity}
//                             </Text>
//                             <Text style={styles.summaryItemPrice}>
//                                 ₹{item.price * item.quantity}
//                             </Text>
//                         </View>
//                     ))}
//                     <View style={styles.billDivider} />
//                     <View style={styles.summaryItem}>
//                         <Text style={styles.summaryTotal}>Total</Text>
//                         <Text style={styles.summaryTotalValue}>₹{totalAmount}</Text>
//                     </View>
//                 </View>

//                 <View style={{ height: 100 }} />
//             </ScrollView>

//             <View style={styles.checkoutFooter}>
//                 <Pressable
//                     style={styles.placeOrderButton}
//                     onPress={() => setOrderPlaced(true)}
//                 >
//                     <Text style={styles.placeOrderButtonText}>Place Order • ₹{totalAmount}</Text>
//                 </Pressable>
//             </View>
//         </View>
//     );
// }