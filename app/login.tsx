import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Colors, Spacing, Typography } from "./theme";
import Button from "./components/Button";
import { useAuth } from "./context/AuthContext";
export default function Login() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSendOTP = async () => {
        if (phoneNumber.length !== 10) {
            setError("Please enter a valid 10-digit mobile number");
            return;
        }
        try {
            await login(phoneNumber); // ✅ generates OTP and saves in context
            router.push("/otp"); // navigate to OTP screen
        } catch (err) {
            console.log(err);
        }
    };


    const handlePhoneChange = (text: string) => {
        // Only allow digits and limit to 10
        const cleaned = text.replace(/\D/g, "").slice(0, 10);
        setPhoneNumber(cleaned);
        setError("");
    };

    return (
        <View style={styles.container}>
            {/* Illustration */}
            <View style={styles.illustrationWrap}>
                <Text style={styles.emoji}>🍕🍔🍱</Text>
                <Text style={styles.appTitle}>FoodExpress</Text>
                <Text style={styles.tagline}>Delicious food, delivered fast</Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
                <Text style={styles.heading}>Welcome Back!</Text>
                <Text style={styles.subtitle}>
                    Enter your phone number to get started
                </Text>

                <View style={styles.inputWrapper}>
                    <View style={styles.prefixWrap}>
                        <Text style={styles.prefix}>+91</Text>
                    </View>
                    <TextInput
                        placeholder="10-digit mobile number"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={handlePhoneChange}
                        style={styles.input}
                        maxLength={10}
                    />
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <Button
                    title="Send OTP"
                    onPress={handleSendOTP}
                // disabled={phoneNumber.length !== 10}
                />

                <Text style={styles.termsText}>
                    By continuing, you agree to our{" "}
                    <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                    <Text style={styles.linkText}>Privacy Policy</Text>
                </Text>
            </View>
        </View>
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
    },
    emoji: {
        fontSize: 64,
        marginBottom: 16,
    },
    appTitle: {
        fontSize: 32,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 8,
    },
    tagline: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.9)",
        fontWeight: "500",
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
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: Colors.card,
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