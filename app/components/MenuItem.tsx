import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Icon from "./Icon";
import { styles } from "../theme/styles";
import { Colors } from "../theme/colors";

function MenuItem({ item, onAdd, onRemove, quantity }) {
    return (
        <View style={styles.menuItem}>
            <View style={styles.menuItemContent}>
                <View style={styles.menuItemInfo}>
                    <View style={styles.vegIndicator}>
                        <View style={[styles.vegDot, { borderColor: item.isVeg ? Colors.success : Colors.danger }]}>
                            <View style={[styles.vegDotInner, { backgroundColor: item.isVeg ? Colors.success : Colors.danger }]} />
                        </View>
                    </View>

                    {item.isBestseller && (
                        <View style={styles.bestsellerBadge}>
                            <Icon name="flame" size={12} color={Colors.warning} />
                            <Text style={styles.bestsellerText}>Bestseller</Text>
                        </View>
                    )}

                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemDescription} numberOfLines={2}>
                        {item.description}
                    </Text>

                    <View style={styles.menuItemFooter}>
                        <Text style={styles.menuItemPrice}>₹{item.price}</Text>
                        {item.rating && (
                            <View style={styles.itemRating}>
                                <Icon name="star" size={12} color={Colors.warning} />
                                <Text style={styles.itemRatingText}>{item.rating}</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.menuItemImageContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.menuItemImage}
                    />
                    {quantity === 0 ? (
                        <Pressable style={styles.addButton} onPress={onAdd}>
                            <Text style={styles.addButtonText}>ADD</Text>
                        </Pressable>
                    ) : (
                        <View style={styles.quantityControl}>
                            <Pressable style={styles.quantityButton} onPress={onRemove}>
                                <Icon name="remove" size={16} color={Colors.primary} />
                            </Pressable>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <Pressable style={styles.quantityButton} onPress={onAdd}>
                                <Icon name="add" size={16} color={Colors.primary} />
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}