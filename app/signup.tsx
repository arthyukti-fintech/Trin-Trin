import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    FadeInUp,
    FadeInDown,
    withSpring,
    useSharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

// Keep your existing imports
import { Colors, Spacing } from "./theme";
import { useAuth } from "./context/AuthContext";

const { width, height } = Dimensions.get("window");

export default function Signup() {
    const router = useRouter();
    // const { register } = useAuth(); // Assuming you have a register function

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [error, setError] = useState("");

    // Animation value for button
    const buttonScale = useSharedValue(1);

    const handleInputChange = (field: string, value: string) => {
        // Basic phone validation logic for the phone field
        if (field === "phone") {
            const cleaned = value.replace(/\D/g, "").slice(0, 10);
            setFormData({ ...formData, [field]: cleaned });
        } else {
            setFormData({ ...formData, [field]: value });
        }
        setError("");
    };

    const handleSignup = async () => {
        // Button animation
        buttonScale.value = withSpring(0.95, {}, () => {
            buttonScale.value = withSpring(1);
        });

        if (!formData.name || !formData.email || formData.phone.length !== 10) {
            setError("Please fill in all fields correctly.");
            return;
        }

        try {
            // await register(formData); // Your registration logic here
            console.log("Registering:", formData);
            router.push("/otp"); // Usually goes to OTP verification after signup
        } catch (err) {
            console.log(err);
            setError("Something went wrong. Try again.");
        }
    };

    const animatedButtonStyle = useAnimatedStyle(() => {
        return { transform: [{ scale: buttonScale.value }] }
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* 1. Header Image (Different from Login to distinguish screens) */}
            <ImageBackground
                source={{ uri: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1000&auto=format&fit=crop" }}
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
                        <Text style={styles.appTitle}>Join the Feast</Text>
                        <Text style={styles.tagline}>Create an account to start ordering.</Text>
                    </Animated.View>
                </LinearGradient>
            </ImageBackground>

            {/* 2. Signup Form Sheet */}
            <Animated.View
                entering={FadeInUp.delay(400).duration(800).springify()}
                style={styles.formContainer}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        <Text style={styles.heading}>Create Account</Text>

                        {/* --- Full Name Input --- */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person-outline" size={20} color={Colors.muted || "#9CA3AF"} style={styles.inputIcon} />
                                <TextInput
                                    placeholder="John Doe"
                                    placeholderTextColor="#9CA3AF"
                                    style={styles.input}
                                    value={formData.name}
                                    onChangeText={(text) => handleInputChange("name", text)}
                                />
                            </View>
                        </View>

                        {/* --- Email Input --- */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail-outline" size={20} color={Colors.muted || "#9CA3AF"} style={styles.inputIcon} />
                                <TextInput
                                    placeholder="john@example.com"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    style={styles.input}
                                    value={formData.email}
                                    onChangeText={(text) => handleInputChange("email", text)}
                                />
                            </View>
                        </View>

                        {/* --- Phone Input --- */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mobile Number</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.prefix}>🇮🇳 +91</Text>
                                <View style={styles.divider} />
                                <TextInput
                                    placeholder="98765 43210"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    style={styles.input}
                                    value={formData.phone}
                                    onChangeText={(text) => handleInputChange("phone", text)}
                                />
                            </View>
                        </View>

                        {error ? (
                            <Animated.Text entering={FadeInUp} style={styles.errorText}>
                                {error}
                            </Animated.Text>
                        ) : null}

                        {/* --- Action Buttons --- */}
                        <View style={styles.actionContainer}>
                            <Animated.View style={[animatedButtonStyle]}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={styles.button}
                                    onPress={handleSignup}
                                >
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                            </Animated.View>

                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Text style={styles.linkText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
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
        height: height * 0.45, // Slightly shorter than login to fit more fields
        justifyContent: "flex-end",
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        paddingBottom: 50,
        paddingHorizontal: 20,
    },
    headerContent: {
        marginBottom: 30,
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
    appTitle: {
        fontSize: 36,
        fontWeight: "800",
        color: "#fff",
        letterSpacing: -0.5,
    },
    tagline: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.85)",
        fontWeight: "500",
        marginTop: 4,
    },
    formContainer: {
        flex: 1,
        backgroundColor: Colors.background || "#fff",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -30,
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    heading: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#4B5563",
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        borderRadius: 14,
        height: 56,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "transparent",
    },
    inputIcon: {
        marginRight: 12,
    },
    prefix: {
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: "#D1D5DB",
        marginHorizontal: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#111827",
        fontWeight: "500",
        height: "100%",
    },
    errorText: {
        color: "#EF4444",
        fontSize: 13,
        marginBottom: 16,
        marginLeft: 4,
    },
    actionContainer: {
        marginTop: 10,
        marginBottom: 40,
    },
    button: {
        height: 56,
        borderRadius: 16,
        backgroundColor: Colors.primary || "#F59E0B",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.primary || "#F59E0B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    footerText: {
        color: "#6B7280",
        fontSize: 14,
    },
    linkText: {
        color: Colors.primary || "#F59E0B",
        fontWeight: "700",
    },
});