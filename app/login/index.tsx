import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
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
import { styles } from "./loginStyle";
import { useLoginMutation } from "@/redux/services/authApi";
import Toast from "react-native-toast-message";
import { getApiErrorMessage } from "@/utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    // const [error, setError] = useState("");
    const [login, { isLoading, error }] = useLoginMutation();

    // Animation value for button press
    const buttonScale = useSharedValue(1);

    // --- LOGIC REMAINS EXACTLY THE SAME ---
    const handleLogin = async () => {
        if (phoneNumber.length !== 10) return;

        const formattedPhone = `+91${phoneNumber}`;

        try {
            const res = await login({ phoneNumber: formattedPhone }).unwrap();

            const accessToken = res?.data?.accessToken;
            console.log(accessToken)

            if (accessToken) {
                // ✅ Store token
                await AsyncStorage.setItem("accessToken", accessToken);
            }

            Toast.show({
                type: "success",
                text1: "OTP Sent",
                text2: "OTP sent successfully",
            });

            router.push("/RestaurantList");

        } catch (err) {
            const errorMessage = getApiErrorMessage(err);

            Toast.show({
                type: "error",
                text1: "Failed to Send OTP",
                text2: errorMessage,
            });

            console.log("Login Error:", err);
        }
    };

    const loginBanner = require("../../assets/images/image.png")

    const handlePhoneChange = (text: string) => {
        const cleaned = text.replace(/\D/g, "").slice(0, 10);
        setPhoneNumber(cleaned);
        // setError("");
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

                            {/* {error ? (
                                <Animated.Text entering={FadeInUp} style={styles.errorText}>
                                    {error}
                                </Animated.Text>
                            ) : null}  */}
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
                                    onPress={handleLogin}
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