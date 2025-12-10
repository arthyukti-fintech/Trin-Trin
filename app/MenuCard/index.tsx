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
import { PinchGestureHandler } from "react-native-gesture-handler";
import { Colors } from "../theme";
import BackHeader from "@/components/BackHeader";

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
            <BackHeader title="Restaurant Details" backTo={'/RestaurantList'} />

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
                    >
                        {IMAGES.map((img) => (
                            <Pressable
                                key={img.id}
                                onPress={() => setPreviewImage(img.source)}
                                style={styles.imageWrapper}
                            >
                                <View style={styles.imageCard}>
                                    <Image
                                        source={getImageSource(img.source)} // ✅ Use helper
                                        style={styles.image}
                                        resizeMode="contain"
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

/* ---------------- FULL SCREEN ZOOM MODAL ---------------- */

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
    const lastScale = useRef(1);

    const onPinchEvent = Animated.event([{ nativeEvent: { scale: scale } }], {
        useNativeDriver: true,
    });

    const onPinchStateChange = (event: any) => {
        if (event.nativeEvent.oldState === 4) {
            const newScale = lastScale.current * event.nativeEvent.scale;
            lastScale.current = Math.max(1, Math.min(newScale, 4));
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleClose = () => {
        lastScale.current = 1;
        scale.setValue(1);
        onClose();
    };

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
                                    source={imageSource} // ✅ Use normalized source
                                    style={[
                                        styles.modalImage,
                                        {
                                            transform: [
                                                { scale: Animated.multiply(scale, lastScale.current) },
                                            ],
                                        },
                                    ]}
                                    resizeMode="contain"
                                />
                            )}
                        </Animated.View>
                    </PinchGestureHandler>
                </View>

                {/* Hint Text */}
                <View style={styles.hintContainer}>
                    <Text style={styles.hintText}>Pinch to zoom • Tap X to close</Text>
                </View>
            </View>
        </Modal>
    );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    titleSection: {
        paddingVertical: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: Colors.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#64748b",
        fontWeight: "500",
    },
    sliderContainer: {
        flex: 1,
        justifyContent: "center",
    },
    scrollView: {
        flexGrow: 0,
    },
    imageWrapper: {
        width: width,
    },
    imageCard: {
        width: width - 32,
        height: (width - 32) * 1.4,
        borderRadius: 16,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    dots: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#cbd5e1",
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: Colors.primary,
        width: 24,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.97)",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 50,
        right: 20,
        zIndex: 10,
    },
    closeButtonInner: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "600",
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: width,
    },
    animatedContainer: {
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
    },
    modalImage: {
        width: width * 0.95,
        height: height * 0.8,
    },
    hintContainer: {
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,0.15)",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    hintText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "500",
    },
});