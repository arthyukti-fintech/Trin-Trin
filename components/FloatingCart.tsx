import React from "react";
import { View, Text, Pressable } from "react-native";
import Icon from "./Icon";
import { styles } from "../theme/styles";

export default function FloatingCart({ count, onPress }) {
  if (count === 0) return null;

  return (
    <Pressable style={styles.floatingCart} onPress={onPress}>
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{count}</Text>
      </View>
      <Text style={styles.floatingCartText}>View Cart</Text>
      <Icon name="cart" color="#fff" />
    </Pressable>
  );
}
