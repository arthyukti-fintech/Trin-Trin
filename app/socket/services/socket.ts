import { base_URL } from "@/redux/config/configURL";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

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

export const getSocket = (): Socket | null => {
  return socket;
};

export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};