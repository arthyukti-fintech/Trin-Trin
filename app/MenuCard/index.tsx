import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
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
import { Colors } from "../theme";
import BackHeader from "@/components/BackHeader";
import { styles } from "./menuCardStyle";

const { width, height } = Dimensions.get("window");

// ✅ Define image type
type ImageItem = {
    id: string;
    source: ImageSourcePropType | string;
};

// ✅ Mixed local and remote images
const IMAGES: ImageItem[] = [
    { id: "1", source: require("../../assets/images/menu.png") },
    {
        id: "2",
        source: "https://elledecor.in/wp-content/uploads/2024/11/VASANTABHAVAN1.jpg"
    },
    { id: "3", source: require("../../assets/images/menu.png") },
    {
        id: "4",
        source: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/d5/bb/74/lounge.jpg?w=900&h=500&s=1"
    },
];

// ✅ Helper function to normalize image source
const getImageSource = (source: ImageSourcePropType | string): ImageSourcePropType => {
    if (typeof source === 'string') {
        return { uri: source };
    }
    return source;
};

export default function MenuScreen() {
    const scrollRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [previewImage, setPreviewImage] = useState<ImageSourcePropType | string | null>(null);

    // Auto slide every 4s
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % IMAGES.length;
            scrollRef.current?.scrollTo({
                x: nextIndex * width,
                animated: true,
            });
            setActiveIndex(nextIndex);
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const onScrollEnd = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        setActiveIndex(index);
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader title="Restaurant Details" backTo={'/RestaurantList'} iconColor="black" />

            <View style={styles.content}>
                {/* Slider Container */}
                <View style={styles.sliderContainer}>
                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={onScrollEnd}
                        style={styles.scrollView}
                        snapToInterval={width} // ✅ Ensures proper snapping
                        decelerationRate="fast" // ✅ Smoother manual scrolling
                    >
                        {IMAGES.map((img) => (
                            <Pressable
                                key={img.id}
                                onPress={() => setPreviewImage(img.source)}
                                style={styles.imageWrapper}
                            >
                                {/* ✅ Centered card within full-width wrapper */}
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

                    {/* Dot Indicators */}
                    <View style={styles.dots}>
                        {IMAGES.map((_, i) => (
                            <View
                                key={i}
                                style={[styles.dot, activeIndex === i && styles.activeDot]}
                            />
                        ))}
                    </View>
                </View>
            </View>

            {/* Zoomable Image Modal */}
            <ImageZoomModal
                visible={!!previewImage}
                image={previewImage}
                onClose={() => setPreviewImage(null)}
            />
        </SafeAreaView>
    );
}

function ImageZoomModal({
    visible,
    image,
    onClose,
}: {
    visible: boolean;
    image: ImageSourcePropType | string | null;
    onClose: () => void;
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const baseScale = useRef(new Animated.Value(1)).current;
    const pinchScale = useRef(new Animated.Value(1)).current;
    const lastScale = useRef(1);

    const onPinchEvent = Animated.event(
        [{ nativeEvent: { scale: pinchScale } }],
        { useNativeDriver: true }
    );

    const onPinchStateChange = (event: any) => {
        // ✅ When pinch gesture ends
        if (event.nativeEvent.oldState === State.ACTIVE) {
            // Calculate new scale
            lastScale.current = lastScale.current * event.nativeEvent.scale;

            // Clamp between 1x and 4x
            lastScale.current = Math.max(1, Math.min(lastScale.current, 4));

            // Update base scale
            baseScale.setValue(lastScale.current);

            // Reset pinch scale to 1
            pinchScale.setValue(1);
        }
    };

    const handleClose = () => {
        // ✅ Reset all scales
        lastScale.current = 1;
        baseScale.setValue(1);
        pinchScale.setValue(1);
        onClose();
    };

    // ✅ Combined scale = baseScale * pinchScale
    const animatedScale = Animated.multiply(baseScale, pinchScale);

    // ✅ Get normalized image source
    const imageSource = image ? getImageSource(image) : null;

    return (
        <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
            <View style={styles.modalContainer}>
                {/* Close Button */}
                <Pressable style={styles.closeButton} onPress={handleClose}>
                    <View style={styles.closeButtonInner}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </View>
                </Pressable>

                {/* Zoomable Image */}
                <View style={styles.imageContainer}>
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
                                        {
                                            transform: [{ scale: animatedScale }],
                                        },
                                    ]}
                                    resizeMode="contain"
                                />
                            )}
                        </Animated.View>
                    </PinchGestureHandler>
                </View>

                {/* Hint Text */}
                {/* <View style={styles.hintContainer}>
                    <Text style={styles.hintText}>Pinch to zoom • Tap X to close</Text>
                </View> */}
            </View>
        </Modal>
    );
}