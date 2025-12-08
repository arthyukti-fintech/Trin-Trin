import React from "react";
import { ScrollView, Pressable, Text } from "react-native";
import { styles } from "../theme/styles";

export default function CategoryTabs({ menu, selected, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {menu.map(cat => (
        <Pressable
          key={cat.id}
          onPress={() => onSelect(cat.category)}
          style={[
            styles.categoryTab,
            selected === cat.category && styles.categoryTabActive,
          ]}
        >
          <Text
            style={[
              styles.categoryTabText,
              selected === cat.category && styles.categoryTabTextActive,
            ]}
          >
            {cat.category}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
