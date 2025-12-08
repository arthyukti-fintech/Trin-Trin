import React, { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import RestaurantHeader from "../components/RestaurantHeader";
import MenuItem from "../components/MenuItem";
import FloatingCart from "../components/FloatingCart";
import { menuData } from "../data/menuData";
import { styles } from "../theme/styles";

export default function RestaurantScreen() {
  const [favorite, setFavorite] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev =>
      prev.find(i => i.id === item.id)
        ? prev.map(i =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...prev, { ...item, qty: 1 }]
    );
  };

  const getQty = (id) => cart.find(i => i.id === id)?.qty || 0;
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <RestaurantHeader
          image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          favorite={favorite}
          onToggle={() => setFavorite(!favorite)}
        />

        {menuData[0].items.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            quantity={getQty(item.id)}
            onAdd={() => addToCart(item)}
            onRemove={() => {}}
          />
        ))}
      </ScrollView>

      <FloatingCart count={cartCount} onPress={() => {}} />
    </SafeAreaView>
  );
}
