import { useEffect } from "react";
import { Alert } from "react-native";
import { getSocket } from "../services/socket";


type UseOrderSocketProps = {
  onOrderPlaced?: (data: any) => void;
  onOrderFailed?: (data: any) => void;
  onAvailabilityChanged?: (data: any) => void;
  onMenuUpdated?: (data: any) => void;
};

export const useOrderSocket = ({
  onOrderPlaced,
  onOrderFailed,
  onAvailabilityChanged,
  onMenuUpdated,
}: UseOrderSocketProps) => {
  useEffect(() => {
    let socket;

    try {
      socket = getSocket();
    } catch (err) {
      console.warn("⚠️ Socket not initialized yet");
      return;
    }

    // ✅ Order placed
    const handleOrderPlaced = (data: any) => {
      console.log("orderPlaced:", data);
      onOrderPlaced?.(data);
    };

    // ❌ Order failed
    const handleOrderFailed = (data: any) => {
      console.log("failedToPlacedOrder:", data);
      Alert.alert("Order Failed", data?.message || "Something went wrong");
      onOrderFailed?.(data);
    };

    // 🔄 Availability changed
    const handleAvailabilityChanged = (data: any) => {
      console.log("availabilityChanged:", data);
      onAvailabilityChanged?.(data);
    };

    // 🍽 Menu updated
    const handleMenuUpdated = (data: any) => {
      console.log("menuUpdated:", data);
      onMenuUpdated?.(data);
    };

    socket.on("orderPlaced", handleOrderPlaced);
    socket.on("failedToPlacedOrder", handleOrderFailed);
    socket.on("availabilityChanged", handleAvailabilityChanged);
    socket.on("menuUpdated", handleMenuUpdated);

    return () => {
      socket.off("orderPlaced", handleOrderPlaced);
      socket.off("failedToPlacedOrder", handleOrderFailed);
      socket.off("availabilityChanged", handleAvailabilityChanged);
      socket.off("menuUpdated", handleMenuUpdated);
    };
  }, []);
};
