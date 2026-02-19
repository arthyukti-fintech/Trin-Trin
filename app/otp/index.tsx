import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    FadeInUp,
    FadeInDown,
    withSpring,
    useSharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";

// Keep existing imports
import { Colors, Spacing } from "../theme";
import { useAuth } from "../context/AuthContext";

const { width, height } = Dimensions.get("window");

export default function Otp() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { phoneNumber } = params;
    const { verifyOtp } = useAuth();

    // Logic States
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(30);
    const inputRefs = useRef<Array<TextInput | null>>([]);
    const isMounted = useRef(true);

    // Animation Value
    const buttonScale = useSharedValue(1);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Countdown timer
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleOtpChange = (text: string, index: number) => {
        const cleaned = text.replace(/\D/g, "");

        if (cleaned.length === 0) {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
            setError("");
            if (index > 0) inputRefs.current[index - 1]?.focus();
        } else if (cleaned.length === 1) {
            const newOtp = [...otp];
            newOtp[index] = cleaned;
            setOtp(newOtp);
            setError("");
            if (index < 5) inputRefs.current[index + 1]?.focus();
        } else if (cleaned.length === 6 && index === 0) {
            const newOtp = cleaned.split("").slice(0, 6);
            setOtp(newOtp);
            setError("");
            inputRefs.current[5]?.focus();
        }
    };

    const handleVerify = async () => {
        // Button Bounce
        buttonScale.value = withSpring(0.95, {}, () => {
            buttonScale.value = withSpring(1);
        });

        const enteredOtp = otp.join("");
        try {
            console.log("Enter in verify");
            await verifyOtp(enteredOtp);
            router.push("/RestaurantDashboard");
        } catch (err) {
            setError("Invalid OTP Code");
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        }
    };

    const handleResendOTP = () => {
        if (timer > 0) return;
        // const newMockOTP = Math.floor(100000 + Math.random() * 900000).toString(); // Logic preserved
        if (isMounted.current) {
            setTimer(30);
            setOtp(["", "", "", "", "", ""]);
            setError("");
            inputRefs.current[0]?.focus();
            // Add toast or alert here if needed
        }
    };

    const formatPhone = (phone: string | string[]) => {
        if (!phone) return "";
        const p = phone.toString();
        return `+91 ${p.slice(0, 5)} ${p.slice(5)}`;
    };

    const animatedButtonStyle = useAnimatedStyle(() => {
        return { transform: [{ scale: buttonScale.value }] };
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* 1. Header Image */}
            <ImageBackground
                source={{
                    uri: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop",
                }} // Pasta/Food preparation image
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
                    style={styles.gradientOverlay}
                >
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(1000)}
                        style={styles.headerContent}
                    >
                        {/* Glassy Back Button */}
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.backButton}
                        >
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>

                        <Text style={styles.appTitle}>Verification</Text>
                        <Text style={styles.tagline}>Security check to keep you safe.</Text>
                    </Animated.View>
                </LinearGradient>
            </ImageBackground>

            {/* 2. Bottom Sheet */}
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
                            <View style={styles.iconHeadingWrap}>
                                <Text style={styles.heading}>Enter Code 🔐</Text>
                            </View>

                            <Text style={styles.subtitle}>
                                We sent a code to <Text style={styles.phoneText}>{formatPhone(phoneNumber)}</Text>
                            </Text>

                            {/* OTP Inputs */}
                            <View style={styles.otpContainer}>
                                {otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        ref={(ref) => {
                                            inputRefs.current[index] = ref;
                                        }}

                                        value={digit}
                                        onChangeText={(text) => handleOtpChange(text, index)}
                                        keyboardType="number-pad"
                                        maxLength={index === 0 ? 6 : 1}
                                        style={[
                                            styles.otpInput,
                                            digit ? styles.otpInputFilled : null,
                                            error ? styles.otpInputError : null,
                                        ]}
                                        autoFocus={index === 0}
                                        selectTextOnFocus
                                    />
                                ))}
                            </View>

                            {error ? (
                                <Animated.View entering={FadeInUp} style={styles.errorContainer}>
                                    <Ionicons name="alert-circle" size={18} color="#EF4444" />
                                    <Text style={styles.errorText}>{error}</Text>
                                </Animated.View>
                            ) : null}
                        </View>

                        {/* Bottom Actions */}
                        <View style={styles.bottomSection}>

                            <View style={styles.resendContainer}>
                                <Text style={styles.resendText}>Didn't receive code? </Text>
                                {timer > 0 ? (
                                    <Text style={styles.timerText}>Resend in {timer}s</Text>
                                ) : (
                                    <TouchableOpacity onPress={handleResendOTP}>
                                        <Text style={styles.resendLink}>Resend OTP</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <Animated.View style={[animatedButtonStyle]}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={styles.button}
                                    onPress={handleVerify}
                                >
                                    <Text style={styles.buttonText}>Verify & Continue</Text>
                                </TouchableOpacity>
                            </Animated.View>

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
        height: height * 0.45,
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
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.2)", // Glass effect
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
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
    formContent: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    iconHeadingWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    heading: {
        fontSize: 26,
        fontWeight: "700",
        color: "#1F2937",
    },
    subtitle: {
        fontSize: 15,
        color: "#6B7280",
        marginBottom: 32,
        lineHeight: 22,
    },
    phoneText: {
        fontWeight: "700",
        color: Colors.primary || "#F59E0B",
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    otpInput: {
        width: width / 8,
        height: 60,
        borderRadius: 12,
        backgroundColor: "#F3F4F6", // Light gray default
        borderWidth: 1.5,
        borderColor: "transparent",
        textAlign: "center",
        fontSize: 24,
        fontWeight: "700",
        color: "#1F2937",
        // Soft shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    otpInputFilled: {
        borderColor: Colors.primary || "#F59E0B",
        backgroundColor: "#fff",
    },
    otpInputError: {
        borderColor: "#EF4444",
        backgroundColor: "#FEF2F2",
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEF2F2",
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    errorText: {
        color: "#EF4444",
        fontSize: 13,
        marginLeft: 6,
        fontWeight: "600",
    },
    bottomSection: {
        marginTop: 20,
    },
    resendContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    resendText: {
        fontSize: 14,
        color: "#6B7280",
    },
    timerText: {
        fontSize: 14,
        color: "#9CA3AF",
        fontWeight: "600",
    },
    resendLink: {
        fontSize: 14,
        color: Colors.primary || "#F59E0B",
        fontWeight: "700",
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
});