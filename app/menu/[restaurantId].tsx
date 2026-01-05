import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  Modal,
  Animated,
  Text,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import BackHeader from "@/components/BackHeader";
import { styles } from "./menuCardStyle";
import { useGetMenuByRestaurantIdQuery } from "@/redux/services/MenuApi";

const { width } = Dimensions.get("window");

/* ===========================
   TYPES
=========================== */

type ImageItem = {
  id: string;
  source: ImageSourcePropType | string;
};

/* ===========================
   HELPERS
=========================== */

const getImageSource = (
  source: ImageSourcePropType | string
): ImageSourcePropType => {
  return typeof source === "string" ? { uri: source } : source;
};

/* ===========================
   SCREEN
=========================== */

export default function MenuScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewImage, setPreviewImage] =
    useState<ImageSourcePropType | string | null>(null);

  const { restaurantId } = useLocalSearchParams<{ restaurantId?: string }>();

  const { data, isLoading, error } =
    useGetMenuByRestaurantIdQuery(restaurantId as string, {
      skip: !restaurantId,
    });

  /* ===========================
     BACKEND IMAGES
  ============================ */

  const backendImages: ImageItem[] =
    data?.data?.menuList
      ?.flatMap((item) =>
        item.image?.map((img) => ({
          id: img._id,
          source: img.imageUrl,
        }))
      ) ?? [];

  const sliderImages: ImageItem[] =
    backendImages.length > 0
      ? backendImages
      : [
          {
            id: "fallback",
            source: require("../../assets/images/menu.png"),
          },
        ];

  /* ===========================
     AUTO SLIDE
  ============================ */

  useEffect(() => {
    if (sliderImages.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % sliderImages.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, sliderImages.length]);

  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  /* ===========================
     STATES
  ============================ */

  if (!restaurantId) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No restaurant selected</Text>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading menu...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Failed to load menu</Text>
      </SafeAreaView>
    );
  }

  /* ===========================
     UI
  ============================ */

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="Restaurant Menu" iconColor="black" />

      <View style={styles.content}>
        {/* IMAGE SLIDER */}
        <View style={styles.sliderContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onScrollEnd}
            snapToInterval={width}
            decelerationRate="fast"
          >
            {sliderImages.map((img) => (
              <Pressable
                key={img.id}
                onPress={() => setPreviewImage(img.source)}
                style={styles.imageWrapper}
              >
                <View style={styles.imageCard}>
                  <Image
                    source={getImageSource(img.source)}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              </Pressable>
            ))}
          </ScrollView>

          {/* DOTS */}
          <View style={styles.dots}>
            {sliderImages.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, activeIndex === i && styles.activeDot]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* IMAGE PREVIEW */}
      <ImageZoomModal
        visible={!!previewImage}
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </SafeAreaView>
  );
}

/* ===========================
   ZOOM MODAL
=========================== */

function ImageZoomModal({
  visible,
  image,
  onClose,
}: {
  visible: boolean;
  image: ImageSourcePropType | string | null;
  onClose: () => void;
}) {
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const lastScale = useRef(1);

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: true }
  );

  const onPinchStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale;
      lastScale.current = Math.max(1, Math.min(lastScale.current, 4));
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);
    }
  };

  const animatedScale = Animated.multiply(baseScale, pinchScale);

  const imageSource = image ? getImageSource(image) : null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>

        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <Animated.View style={styles.animatedContainer}>
            {imageSource && (
              <Animated.Image
                source={imageSource}
                style={[
                  styles.modalImage,
                  { transform: [{ scale: animatedScale }] },
                ]}
                resizeMode="contain"
              />
            )}
          </Animated.View>
        </PinchGestureHandler>
      </View>
    </Modal>
  );
}
