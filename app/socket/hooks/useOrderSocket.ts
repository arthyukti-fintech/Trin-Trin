import { useEffect } from "react";
import { initSocket } from "../services/socket";

export const useOrderSocket = (onOrderPlaced: (data: any) => void) => {
  useEffect(() => {
    const socket = initSocket(); // always returns Socket

    socket.on("orderPlaced", onOrderPlaced);

    return () => {
      socket.off("orderPlaced", onOrderPlaced);
    };
  }, [onOrderPlaced]);
};