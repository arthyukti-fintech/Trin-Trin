import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../theme";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: 0, // ✅ Changed from 16 to 0
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
        width: width, // ✅ Full screen width for proper pagination
        justifyContent: "center", // ✅ Center the card
        alignItems: "center", // ✅ Center the card
    },
    imageCard: {
        width: width - 32, // ✅ Card width with padding
        height: (width - 32) * 1.4,
        borderRadius: 16,
        overflow: "hidden", // ✅ Ensures rounded corners work with image
        backgroundColor: "#f1f5f9", // ✅ Subtle background while loading
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