import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Colors, Spacing } from "@/app/theme";
import { useLocalSearchParams } from "expo-router";
import GoBackArrow from "@/components/common/GoBackArrow";
import { Modal, Pressable } from "react-native";
import { useGetSingleOrderQuery } from "@/redux/services/getordersApi";


export default function OrderDetails() {

  const { order, orderId } = useLocalSearchParams();
  // const parsedOrder = order ? JSON.parse(order as string) : null;
  // if (!parsedOrder) return null;
  // const [modalVisible, setModalVisible] = React.useState(false);
  // const [selectedItem, setSelectedItem] = React.useState<any>(null);
  // const [selectedAction, setSelectedAction] = React.useState<string | null>(null);

  const { data, isLoading, error } = useGetSingleOrderQuery(
    orderId as string
  );

  console.log(data, "single order details data")

  // const totalAmount = parsedOrder.items?.reduce(
  //   (sum: number, item: any) =>
  //     sum + item.price * item.quantity,
  //   0
  // );

  return (
    // <View style={styles.container}>
    //   <GoBackArrow label="Back to Orders" />
    //   <ScrollView >
    //     <Text style={styles.title}>Order #{parsedOrder._id.slice(-6)}</Text>

    //     {/* Order Info */}
    //     <View style={styles.infoCard}>
    //       <Text>Status: {parsedOrder.status}</Text>
    //       <Text>
    //         Time: {new Date(parsedOrder.createdAt).toLocaleString()}
    //       </Text>

    //     </View>

    //     {/* Dishes List */}
    //     <Text style={styles.sectionTitle}>Ordered Items</Text>

    //     {parsedOrder.items?.map((item: any) => (

    //       <View key={item._id} style={styles.itemCard}>
    //         <View>
    //           <Text style={styles.itemName}>
    //             {item.itemName}
    //           </Text>
    //           <Text style={styles.itemDetails}>
    //             ₹{item.price} × {item.quantity}
    //           </Text>
    //         </View>

    //         <TouchableOpacity
    //           style={styles.unavailableBtn}
    //           onPress={() => {
    //             setSelectedItem(item);
    //             setModalVisible(true);
    //           }}
    //         >

    //           <Text style={styles.unavailableText}>
    //             Unavailable Item
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     ))}

    //     {/* Total */}
    //     <View style={styles.totalCard}>
    //       <Text style={styles.totalText}>
    //         Total: ₹{totalAmount}
    //       </Text>
    //     </View>
    //   </ScrollView>

    //   <Modal
    //     visible={modalVisible}
    //     transparent
    //     animationType="slide"
    //   >
    //     <View style={styles.modalOverlay}>
    //       <View style={styles.modalContainer}>

    //         <Text style={styles.modalTitle}>
    //           {selectedItem?.itemName} is unavailable
    //         </Text>

    //         {/* OPTION 1 */}
    //         <Pressable
    //           style={[
    //             styles.optionCard,
    //             selectedAction === "adjust" && styles.optionSelected
    //           ]}
    //           onPress={() => setSelectedAction("adjust")}
    //         >
    //           <Text style={styles.optionTitle}>ADJUST BILL</Text>
    //           <Text style={styles.optionDesc}>
    //             Remove item and reduce total amount
    //           </Text>
    //         </Pressable>

    //         {/* OPTION 2 */}
    //         <Pressable
    //           style={[
    //             styles.optionCard,
    //             selectedAction === "cancel" && styles.optionSelected
    //           ]}
    //           onPress={() => setSelectedAction("cancel")}
    //         >
    //           <Text style={styles.optionTitle}>CANCEL ORDER</Text>
    //           <Text style={styles.optionDesc}>
    //             Cancel entire order for full refund
    //           </Text>
    //         </Pressable>

    //         {/* OPTION 3 */}
    //         <Pressable
    //           style={[
    //             styles.optionCard,
    //             selectedAction === "replace" && styles.optionSelected
    //           ]}
    //           onPress={() => setSelectedAction("replace")}
    //         >
    //           <Text style={styles.optionTitle}>REPLACE ITEM</Text>
    //           <Text style={styles.optionDesc}>
    //             Choose alternative item from menu
    //           </Text>
    //         </Pressable>

    //         {/* BUTTONS */}
    //         <View style={styles.modalButtons}>
    //           <TouchableOpacity
    //             style={styles.cancelBtn}
    //             onPress={() => {
    //               setModalVisible(false);
    //               setSelectedAction(null);
    //             }}
    //           >
    //             <Text style={styles.cancelText}>Cancel</Text>
    //           </TouchableOpacity>

    //           <TouchableOpacity
    //             style={styles.notifyBtn}
    //             disabled={!selectedAction}
    //             onPress={() => {
    //               console.log("Notify Customer:", {
    //                 orderId: parsedOrder._id,
    //                 itemId: selectedItem._id,
    //                 action: selectedAction,
    //               });

    //               // 👉 Here you call API to notify customer
    //               setModalVisible(false);
    //               setSelectedAction(null);
    //             }}
    //           >
    //             <Text style={styles.notifyText}>Notify Customer</Text>
    //           </TouchableOpacity>
    //         </View>

    //       </View>
    //     </View>
    //   </Modal>

    // </View>
    <View>
      <Text>Text check</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,

  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  infoCard: {
    backgroundColor: Colors.primarySoft,
    padding: Spacing.md,
    borderRadius: 10,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: Spacing.sm,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: Spacing.sm,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemDetails: {
    color: Colors.muted,
  },
  unavailableBtn: {
    backgroundColor: Colors.warning,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  unavailableText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  totalCard: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  totalText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },

  optionCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },

  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySoft,
  },

  optionTitle: {
    fontWeight: "600",
  },

  optionDesc: {
    fontSize: 12,
    color: "#666",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  cancelBtn: {
    padding: 10,
  },

  cancelText: {
    color: "red",
    fontWeight: "600",
  },

  notifyBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },

  notifyText: {
    color: "#fff",
    fontWeight: "600",
  },

});