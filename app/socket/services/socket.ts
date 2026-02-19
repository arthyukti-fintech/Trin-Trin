import { base_URL } from "@/redux/config/configURL";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

/**
 * Initialize socket if not already initialized.
 * Logs token usage + registers user after connect.
 */
export const initSocket = (
  url: string = base_URL,
  token?: string,
  userId?: string
): Socket => {

  if (!socket) {
    if (token) {
      console.log("🔐 Token found — initializing socket");
    }

    socket = io(url, {
      transports: ["websocket"],
      reconnection: true,
      auth: token ? { token } : undefined,
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket?.id);

      if (userId) {
        console.log("📡 Registering user:", userId);
        socket?.emit("registerUser", userId);
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });
  }

  return socket;
};

/**
 * Get initialized socket instance
 */
export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket() first.");
  }
  return socket;
};

/**
 * Close socket safely
 */
export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
