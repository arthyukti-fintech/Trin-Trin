import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../theme";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    backgroundImage: {
        width: width,
        height: height * 0.55, // Takes up top 55%
        justifyContent: "flex-end",
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        paddingBottom: 60,
        paddingHorizontal: 20,
    },
    headerContent: {
        marginBottom: 40,
    },
    appTitle: {
        fontSize: 42,
        fontWeight: "800",
        color: "#fff",
        letterSpacing: -1,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
    },
    tagline: {
        fontSize: 18,
        color: "rgba(255, 255, 255, 0.9)",
        fontWeight: "500",
        marginTop: 4,
    },
    formContainer: {
        flex: 1,
        backgroundColor: Colors.background || "#fff",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -40, // Overlap the image slightly
        paddingHorizontal: 24,
        paddingTop: 32,
        // Modern Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 20,
    },
    formContent: {
        flex: 1,
        justifyContent: "space-between", // Pushes button to bottom
        paddingBottom: 40,
    },
    heading: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: "#6B7280",
        marginBottom: 32,
        lineHeight: 22,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6", // Light gray background instead of border
        borderRadius: 16,
        height: 60,
        borderWidth: 1,
        borderColor: "transparent",
    },
    inputError: {
        borderColor: "#EF4444",
        backgroundColor: "#FEF2F2",
    },
    prefixWrap: {
        paddingHorizontal: 16,
        borderRightWidth: 1,
        borderRightColor: "#E5E7EB",
        height: "50%",
        justifyContent: "center",
    },
    prefix: {
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 18,
        color: "#111827",
        fontWeight: "600",
        height: "100%",
    },
    errorText: {
        color: "#EF4444",
        fontSize: 13,
        marginTop: 8,
        marginLeft: 4,
        fontWeight: "500",
    },
    bottomSection: {
        marginTop: 20,
    },
    button: {
        height: 56,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.primary || "#F59E0B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
    },
    buttonActive: {
        backgroundColor: Colors.primary || "#F59E0B", // Fallback to orange if Colors.primary undefined
    },
    buttonInactive: {
        backgroundColor: "#D1D5DB",
        shadowOpacity: 0,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },
    termsText: {
        fontSize: 13,
        color: "#9CA3AF",
        textAlign: "center",
        marginTop: 24,
    },
    linkText: {
        color: Colors.primary || "#F59E0B",
        fontWeight: "600",
    },
    backButton: {
        marginBottom: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});