import { useEffect } from "react";
import { getSocket } from "../services/socket";

export const useOrderSocket = (onOrderPlaced: (data: any) => void) => {
  useEffect(() => {
    const socket = getSocket();

    socket.on("orderPlaced", onOrderPlaced);

    return () => {
      socket.off("orderPlaced", onOrderPlaced);
    };
  }, []);
};
