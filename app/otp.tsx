import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing } from "./theme";
import Button from "./components/Button";
import { useAuth } from "./context/AuthContext";

export default function Otp() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { phoneNumber, mockOTP } = params;
    const { verifyOtp } = useAuth();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(30);
    const inputRefs = useRef<Array<TextInput | null>>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false; // mark unmounted
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
        const enteredOtp = otp.join("");

        try {
            console.log("Enter in verify")
            await verifyOtp(enteredOtp); // ✅ checks against sentOtp in context
            router.push("/(tabs)");
        } catch (err) {
            setError("Invalid OTP");
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        }
    };0
    const handleResendOTP = () => {
        if (timer > 0) return;

        const newMockOTP = Math.floor(100000 + Math.random() * 900000).toString();

        if (isMounted.current) {
            setTimer(30);
            setOtp(["", "", "", "", "", ""]);
            setError("");
            inputRefs.current[0]?.focus();
        }
    };

    const formatPhone = (phone: string) => {
        if (!phone) return "";
        return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={Colors.secondary} />
            </Pressable>

            <View style={styles.header}>
                <View style={styles.iconWrap}>
                    <Ionicons name="mail-open" size={48} color={Colors.primary} />
                </View>
                <Text style={styles.heading}>Verify OTP</Text>
                <Text style={styles.subtitle}>We've sent a 6-digit code to</Text>
                <Text style={styles.phoneText}>{formatPhone(phoneNumber as string)}</Text>
            </View>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        value={digit}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        keyboardType="number-pad"
                        maxLength={index === 0 ? 6 : 1}
                        style={[styles.otpInput, digit && styles.otpInputFilled, error && styles.otpInputError]}
                        autoFocus={index === 0}
                    />
                ))}
            </View>

            {error ? (
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={16} color="#EF4444" />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}

            <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive code? </Text>
                {timer > 0 ? (
                    <Text style={styles.timerText}>Resend in {timer}s</Text>
                ) : (
                    <Pressable onPress={handleResendOTP}>
                        <Text style={styles.resendLink}>Resend OTP</Text>
                    </Pressable>
                )}
            </View>

            <Button title="Verify & Continue" onPress={handleVerify} />

            <Text style={styles.helpText}>💡 Tip: The OTP is displayed in the alert for demo purposes</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, padding: Spacing.xl },
    backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.card, alignItems: "center", justifyContent: "center", marginBottom: Spacing.lg },
    header: { alignItems: "center", marginBottom: Spacing.xl },
    iconWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primarySoft, alignItems: "center", justifyContent: "center", marginBottom: Spacing.md },
    heading: { fontSize: 28, fontWeight: "700", color: Colors.secondary, marginBottom: 8 },
    subtitle: { fontSize: 14, color: Colors.muted, marginBottom: 4 },
    phoneText: { fontSize: 16, fontWeight: "700", color: Colors.primary },
    otpContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: Spacing.md },
    otpInput: { width: 50, height: 56, borderWidth: 2, borderColor: Colors.border, borderRadius: 12, backgroundColor: Colors.card, textAlign: "center", fontSize: 24, fontWeight: "700", color: Colors.secondary },
    otpInputFilled: { borderColor: Colors.primary, backgroundColor: Colors.primarySoft },
    otpInputError: { borderColor: "#EF4444" },
    errorContainer: { flexDirection: "row", alignItems: "center", marginBottom: Spacing.md, backgroundColor: "#FEE2E2", padding: Spacing.sm, borderRadius: 8 },
    errorText: { color: "#EF4444", fontSize: 13, marginLeft: 8, fontWeight: "600" },
    resendContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: Spacing.xl },
    resendText: { fontSize: 14, color: Colors.muted },
    timerText: { fontSize: 14, color: Colors.muted, fontWeight: "600" },
    resendLink: { fontSize: 14, color: Colors.primary, fontWeight: "700" },
    helpText: { fontSize: 12, color: Colors.muted, textAlign: "center", marginTop: Spacing.md, lineHeight: 18 },
});