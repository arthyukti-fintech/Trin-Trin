import React from "react";
import { Text } from "react-native";
import { Colors } from "../theme/colors";

const icons = {
  "arrow-back": "←",
  heart: "♥",
  "heart-outline": "♡",
  share: "⎋",
  star: "★",
  time: "⏱",
  location: "📍",
  flame: "🔥",
  cart: "🛒",
  add: "+",
  remove: "−",
  check: "✓",
};

export default function Icon({ name, size = 20, color = Colors.secondary }) {
  return <Text style={{ fontSize: size, color }}>{icons[name]}</Text>;
}
