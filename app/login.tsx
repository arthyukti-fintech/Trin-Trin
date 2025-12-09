import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Animated, Easing, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Link, useRouter } from "expo-router";
import { Colors, Spacing, Typography } from "./theme";
import Button from "./components/Button";
import { useAuth } from "./context/AuthContext";
import { Video, ResizeMode } from "expo-av";
import TrinTrinVideo from "../assets/videos/TrinTrin.mp4";

export default function Login() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const { login } = useAuth();

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const inputScaleAnim = useRef(new Animated.Value(1)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const videoScaleAnim = useRef(new Animated.Value(1)).current;
    const videoRotateAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 600,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.back(1.2)),
                useNativeDriver: true,
            }),
        ]).start();

        // Floating animation for illustration
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: -10,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Video zoom in/out pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(videoScaleAnim, {
                    toValue: 1.08,
                    duration: 3000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(videoScaleAnim, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Subtle rotation animation for video
        Animated.loop(
            Animated.sequence([
                Animated.timing(videoRotateAnim, {
                    toValue: 1,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(videoRotateAnim, {
                    toValue: -1,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(videoRotateAnim, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Pulsing glow effect
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.15,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const handleSendOTP = async () => {
        if (phoneNumber.length !== 10) {
            setError("Please enter a valid 10-digit mobile number");
            // Shake animation on error
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();
            return;
        }
        try {
            await login(phoneNumber);
            router.push("/otp");
        } catch (err) {
            console.log(err);
        }
    };

    const handlePhoneChange = (text: string) => {
        const cleaned = text.replace(/\D/g, "").slice(0, 10);
        setPhoneNumber(cleaned);
        setError("");
    };

    const handleFocus = () => {
        setIsFocused(true);
        Animated.spring(inputScaleAnim, {
            toValue: 1.02,
            friction: 5,
            tension: 100,
            useNativeDriver: true,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.spring(inputScaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 100,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Animated Illustration Section */}
                <Animated.View
                    style={[
                        styles.illustrationWrap,
                        {
                            transform: [
                                { translateY: bounceAnim },
                                { scale: scaleAnim },
                            ],
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    {/* Pulsing Glow Background */}
                    <Animated.View
                        style={[
                            styles.glowEffect,
                            {
                                transform: [{ scale: pulseAnim }],
                                opacity: 0.3,
                            },
                        ]}
                    />

                    {/* Decorative food emojis floating around */}
                    <Animated.Text
                        style={[
                            styles.floatingEmoji,
                            styles.emoji1,
                            { transform: [{ translateY: bounceAnim }] },
                        ]}
                    >
                        🍕
                    </Animated.Text>
                    <Animated.Text
                        style={[
                            styles.floatingEmoji,
                            styles.emoji2,
                            {
                                transform: [
                                    {
                                        translateY: bounceAnim.interpolate({
                                            inputRange: [-10, 0],
                                            outputRange: [0, 10],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        🍔
                    </Animated.Text>
                    <Animated.Text
                        style={[
                            styles.floatingEmoji,
                            styles.emoji3,
                            {
                                transform: [
                                    {
                                        translateY: bounceAnim.interpolate({
                                            inputRange: [-10, 0],
                                            outputRange: [5, -5],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        🍱
                    </Animated.Text>

                    {/* Animated Video Container */}
                    <Animated.View
                        style={[
                            styles.videoContainer,
                            {
                                transform: [
                                    { scale: videoScaleAnim },
                                    {
                                        rotate: videoRotateAnim.interpolate({
                                            inputRange: [-1, 1],
                                            outputRange: ['-3deg', '3deg'],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Video
                            source={TrinTrinVideo}
                            resizeMode={ResizeMode.COVER}
                            shouldPlay
                            isLooping
                            isMuted
                            style={styles.video}
                        />
                    </Animated.View>
                </Animated.View>

                {/* Animated Form Container */}
                <Animated.View
                    style={[
                        styles.formContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideUpAnim }],
                        },
                    ]}
                >
                    <Text style={styles.heading}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>
                        Enter your phone number to get started
                    </Text>

                    <Animated.View
                        style={[
                            styles.inputWrapper,
                            {
                                transform: [
                                    { scale: inputScaleAnim },
                                    { translateX: shakeAnim },
                                ],
                                borderColor: isFocused ? Colors.primary : Colors.border,
                                borderWidth: isFocused ? 2.5 : 2,
                            },
                        ]}
                    >
                        <View style={styles.prefixWrap}>
                            <Text style={styles.prefix}>+91</Text>
                        </View>
                        <TextInput
                            placeholder="10-digit mobile number"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={handlePhoneChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={styles.input}
                            maxLength={10}
                            placeholderTextColor={Colors.muted}
                        />
                    </Animated.View>

                    {error ? (
                        <Animated.Text
                            style={[
                                styles.errorText,
                                {
                                    opacity: fadeAnim,
                                },
                            ]}
                        >
                            {error}
                        </Animated.Text>
                    ) : null}

                    <Button
                        title="Send OTP"
                        onPress={handleSendOTP}
                    />

                    <Text style={styles.termsText}>
                        By continuing, you agree to our{" "}
                      <Text onPress={()=>router.push("/screens/LoginsignupScreen")} style={styles.linkText}>Terms of Service</Text> and{" "}
                        <Text style={styles.linkText}>Privacy Policy</Text>
                    </Text>
              
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    illustrationWrap: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        overflow: 'visible',
    },
    videoContainer: {
        width: "50%",
        height: 120,
        zIndex: 5,
    },
    video: {
        width: "100%",
        height: "100%",
        borderRadius: 16,
    },
    glowEffect: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#fff',
        zIndex: -1,
    },
    floatingEmoji: {
        position: 'absolute',
        fontSize: 36,
        zIndex: 10,
    },
    emoji1: {
        top: 30,
        left: 30,
    },
    emoji2: {
        top: 50,
        right: 40,
    },
    emoji3: {
        bottom: 40,
        left: 50,
    },
    formContainer: {
        flex: 0.6,
        padding: Spacing.xl,
        justifyContent: "center",
    },
    heading: {
        fontSize: 28,
        fontWeight: "700",
        color: Colors.secondary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.muted,
        marginBottom: Spacing.xl,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: Colors.card,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    prefixWrap: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRightWidth: 1,
        borderRightColor: Colors.border,
    },
    prefix: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.secondary,
    },
    input: {
        flex: 1,
        padding: Spacing.md,
        fontSize: 16,
        color: Colors.secondary,
        fontWeight: "500",
    },
    errorText: {
        color: "#EF4444",
        fontSize: 12,
        marginBottom: 12,
        marginLeft: 4,
        fontWeight: "500",
    },
    termsText: {
        fontSize: 12,
        color: Colors.muted,
        textAlign: "center",
        marginTop: Spacing.md,
        lineHeight: 18,
    },
    linkText: {
        color: Colors.primary,
        fontWeight: "600",
    },
});