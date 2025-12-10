import React from "react";
import { View, Image, Pressable } from "react-native";
import Icon from "./Icon";
import { styles } from "../theme/styles";

export default function RestaurantHeader({ image, favorite, onToggle }) {
  return (
    <View style={styles.headerImage}>
      <Image source={{ uri: image }} style={styles.restaurantImage} />

      <View style={styles.headerOverlay}>
        <Pressable style={styles.headerButton}>
          <Icon name="arrow-back" color="#fff" size={24} />
        </Pressable>

        <Pressable style={styles.headerButton} onPress={onToggle}>
          <Icon
            name={favorite ? "heart" : "heart-outline"}
            color="#fff"
            size={24}
          />
        </Pressable>
      </View>
    </View>
  );
}
