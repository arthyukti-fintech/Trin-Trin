import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { Colors, Spacing } from "../theme";
import Button from "../components/Button";

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

  return (
    <View style={styles.container}>
      {/* 🔴 TOP BRAND SECTION */}
      <View style={styles.topSection}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.appTitle}>Tring Tring</Text>
        <Text style={styles.tagline}>
          Call → Get bill → Pay → Delivered
        </Text>
      </View>

      {/* ⚪ LOGIN FORM */}
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Welcome back 👋</Text>
        <Text style={styles.subtitle}>
          Enter your mobile number to continue
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
            placeholderTextColor={Colors.muted}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          title="Send OTP"
          onPress={handleSendOTP}
        />

        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.linkText}>Terms</Text> &{" "}
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

  /* 🔴 TOP SECTION */
  topSection: {
    flex: 0.45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: Spacing.lg,
  },

  logoWrapper: {
    backgroundColor: Colors.accentSoft,
    padding: 18,
    borderRadius: 999,
    marginBottom: 12,
  },

  logo: {
    width: 96,
    height: 96,
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
    letterSpacing: 0.5,
  },

  tagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    fontWeight: "500",
  },

  /* ⚪ FORM */
  formContainer: {
    flex: 0.55,
    padding: Spacing.xl,
    justifyContent: "center",
  },

  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.secondary,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: Spacing.xl,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",   // ✅ IMPORTANT
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.card,
    height: 56,             // ✅ FIXED HEIGHT
    marginBottom: 12,
  },
  prefixWrap: {
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
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
    color: Colors.error,
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
    fontWeight: "600",
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
    fontWeight: "700",
  },
});
