import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import { useAuth } from "../context/AuthContext";
import { Colors } from "../theme";

const { width, height } = Dimensions.get("window");

export default function Login() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    // Animation value for button press
    const buttonScale = useSharedValue(1);

    // --- LOGIC REMAINS EXACTLY THE SAME ---
    const handleSendOTP = async () => {
        // Button bounce animation
        buttonScale.value = withSpring(0.95, {}, () => {
            buttonScale.value = withSpring(1);
        });

        if (phoneNumber.length !== 10) {
            setError("Please enter a valid 10-digit mobile number");
            return;
        }
        try {
            await login(phoneNumber);
            router.push("/otp");
        } catch (err) {
            console.log(err);
        }
    };

    const loginBanner = require("../../assets/images/image.png")

    const handlePhoneChange = (text: string) => {
        const cleaned = text.replace(/\D/g, "").slice(0, 10);
        setPhoneNumber(cleaned);
        setError("");
    };

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: buttonScale.value }],
        };
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* 1. Background Image Section */}
            <ImageBackground
                source={loginBanner} // High quality food image
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]}
                    style={styles.gradientOverlay}
                >
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(1000)}
                        style={styles.headerContent}
                    >
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.backButton}
                        >
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        {/* <Text style={styles.appTitle}>Trin Trin</Text> */}
                        <Text style={styles.tagline}>Cravings? Solved.</Text>
                    </Animated.View>
                </LinearGradient>
            </ImageBackground>

            {/* 2. Login Form Bottom Sheet */}
            <Animated.View
                entering={FadeInUp.delay(400).duration(800).springify()}
                style={styles.formContainer}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <View style={styles.formContent}>
                        <View>
                            <Text style={styles.heading}>Welcome Back 👋</Text>
                            <Text style={styles.subtitle}>
                                Login to access the best food around you.
                            </Text>

                            {/* Input Field */}
                            <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
                                <View style={styles.prefixWrap}>
                                    <Text style={styles.prefix}>🇮🇳 +91</Text>
                                </View>
                                <TextInput
                                    placeholder="Mobile Number"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="phone-pad"
                                    value={phoneNumber}
                                    onChangeText={handlePhoneChange}
                                    style={styles.input}
                                    maxLength={10}
                                    selectionColor={Colors.primary}
                                />
                            </View>

                            {error ? (
                                <Animated.Text entering={FadeInUp} style={styles.errorText}>
                                    {error}
                                </Animated.Text>
                            ) : null}
                        </View>

                        <View style={styles.bottomSection}>
                            {/* Custom Animated Button */}
                            <Animated.View style={[animatedButtonStyle]}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={[
                                        styles.button,
                                        phoneNumber.length === 10 ? styles.buttonActive : styles.buttonInactive
                                    ]}
                                    onPress={handleSendOTP}
                                >
                                    <Text style={styles.buttonText}>Get OTP</Text>
                                </TouchableOpacity>
                            </Animated.View>

                            <Text style={styles.termsText}>
                                By continuing, you agree to our{" "}
                                <Text style={styles.linkText} onPress={() => router.push("/signup")}>Terms</Text> &{" "}
                                <Text style={styles.linkText}>Privacy Policy</Text>
                            </Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
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