import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { Colors } from "../theme";

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { verifyOtp } = useAuth();
  const router = useRouter();


  const inputRefs = useRef<(TextInput | null)[]>([]);
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];

    // Only allow single digit
    if (text.length > 1) {
      text = text.charAt(0);
    }

    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit when last digit is entered
    if (text && index === 5) {
      handleVerifyOtp();
    }
  };

  const handleKeyPress = (e:any, index:any) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const getCombinedOtp = () => {
    return otp.join("");
  };

  const handleVerifyOtp = async () => {
    const combinedOtp = getCombinedOtp();

    // if (combinedOtp.length !== 6) {
    //   Alert.alert("Invalid OTP", "Please enter all 6 digits");
    //   return;
    // }

    console.log("📲 Verifying OTP...");

    try {
      await verifyOtp(combinedOtp);
      console.log("OTP VERIFIED");
      router.replace("/RestaurantDashboard");
    } catch (error) {
      console.log("❌ OTP FAILED", error);
      Alert.alert("Verification Failed", "Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = () => {
    console.log("📱 Resending OTP...");
    Alert.alert("OTP Sent", "A new OTP has been sent to your phone.");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Enter OTP </Text>
            <Text style={styles.subtitle}>
              We've sent a 6-digit code to your phone number
            </Text>
          </View>

          {/* OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}

                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                style={[
                  styles.otpInput,
                  digit && styles.otpInputFilled
                ]}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* Hidden combined input for accessibility */}
          <TextInput
            style={styles.hiddenInput}
            value={getCombinedOtp()}
            onChangeText={(text) => {
              if (text.length <= 6) {
                const newOtp = text.split("").concat(Array(6 - text.length).fill(""));
                setOtp(newOtp.slice(0, 6));
              }
            }}
            keyboardType="number-pad"
            maxLength={6}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleVerifyOtp}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>

          {/* Resend OTP */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.resendButton}>Resend OTP</Text>
            </TouchableOpacity>
          </View>

          {/* Timer (optional) */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Code expires in: 04:59</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentSoft,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    gap: 5,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  otpInputFilled: {
    borderColor: "#dc2626",
    backgroundColor: "#fef2f2",
    shadowColor: "#dc2626",
    shadowOpacity: 0.1,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
  },
  button: {
    backgroundColor: "#dc2626",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#dc2626",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  resendText: {
    fontSize: 15,
    color: "#64748b",
  },
  resendButton: {
    fontSize: 15,
    color: "#dc2626",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  timerContainer: {
    alignItems: "center",
  },
  timerText: {
    fontSize: 14,
    color: "#ef4444",
    fontWeight: "600",
  },
});