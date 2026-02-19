import { useGetAllRestaurantsQuery } from "@/redux/services/restaurentOwnerRestaurentsApi";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../theme";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

function RestaurentOwnerRestaurents() {
  const { data, isLoading, error } = useGetAllRestaurantsQuery();
  const result = data?.data?.restaurants ?? [];

  if (isLoading)
    return <ActivityIndicator size="large" color={Colors.primary} />;

  if (error)
    return <Text style={{ textAlign: "center" }}>Something went wrong</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Restaurants</Text>

      <FlatList
        data={result}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RestaurantCard item={item} />}
      />
    </View>
  );
}

export default RestaurentOwnerRestaurents;





/* ===========================
   CARD COMPONENT
=========================== */

const RestaurantCard = ({ item }: any) => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    item.images.exterior,
    item.images.interior,
    item.images.menuCard,
  ];

  /* AUTO SLIDER */
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;

      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 32),
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 2500); // smoother UX

    return () => clearInterval(interval);
  }, [currentIndex]);



  /* CLICK CARD → NAVIGATE */
  const handlePress = () => {
    router.push({
      pathname: "/Home/restaurant-owner-home",
      params: {
        restaurantId: item._id,
        restaurantName: item.name,
      },
    });
  };



  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <View style={styles.card}>
        {/* Image Slider */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
        >
          {images.map((img: string, index: number) => (
            <Image key={index} source={{ uri: img }} style={styles.sliderImage} />
          ))}
        </ScrollView>

        {/* Name */}
        <Text style={styles.name}>{item.name}</Text>

        {/* Address */}
        <Text style={styles.address}>
          {item.address.street}, {item.address.city},{" "}
          {item.address.state} - {item.address.pincode}
        </Text>
      </View>
    </TouchableOpacity>
  );
};





/* ===========================
   STYLES
=========================== */

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accentSoft,
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
    color: Colors.secondary,
    letterSpacing: 0.8,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 20,
    elevation: 4,
    overflow: "hidden",
  },

  sliderImage: {
    width: width - 32,
    height: 180,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    paddingHorizontal: 14,
    color: Colors.secondary,
  },

  address: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 14,
    paddingHorizontal: 14,
  },
});
