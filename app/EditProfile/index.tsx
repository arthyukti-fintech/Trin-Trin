import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Image,
    ScrollView,
} from "react-native";
import { Colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import BackHeader from "@/components/BackHeader";

export default function EditProfile() {
    const [name, setName] = useState("Arman");
    const [phone, setPhone] = useState("9876543210");
    const [email, setEmail] = useState("arman@example.com");
    const [dob, setDob] = useState("2000-01-01");
    const [gender, setGender] = useState("Male");

    const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);

    return (
        <View style={styles.container}>
            <BackHeader title="Profile" iconColor="black" />

            {/* Scrollable Section */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Image */}
                <View style={styles.avatarContainer}>
                    <Image
                        source={require("../../assets/images/logo.png")}
                        style={styles.avatar}
                    />
                    <Pressable style={styles.editAvatarBtn}>
                        <Ionicons name="camera" size={20} color="#fff" />
                    </Pressable>
                </View>

                {/* Input Fields */}
                <View style={styles.form}>
                    {/* Full Name */}
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        placeholder="Enter your name"
                    />

                    {/* Phone */}
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.input}
                        placeholder="Enter phone number"
                        keyboardType="phone-pad"
                    />

                    {/* Email */}
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        placeholder="Enter email"
                        keyboardType="email-address"
                    />

                    {/* Gender Dropdown */}
                    <Text style={styles.label}>Gender</Text>

                    <Pressable
                        style={styles.dropdownTrigger}
                        onPress={() => setGenderDropdownOpen(!genderDropdownOpen)}
                    >
                        <Text style={styles.dropdownText}>{gender}</Text>
                        <Ionicons
                            name={genderDropdownOpen ? "chevron-up" : "chevron-down"}
                            size={18}
                            color={Colors.muted}
                        />
                    </Pressable>

                    {/* Dropdown List */}
                    {genderDropdownOpen && (
                        <View style={styles.dropdownList}>
                            {["Male", "Female", "Other"].map((g) => (
                                <Pressable
                                    key={g}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setGender(g);
                                        setGenderDropdownOpen(false);
                                    }}
                                >
                                    <Text style={styles.dropdownItemText}>{g}</Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                </View>

                {/* Save Button */}
                <Pressable style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
    },

    avatarContainer: {
        alignItems: "center",
        marginVertical: 25,
    },

    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "#ddd",
    },

    editAvatarBtn: {
        position: "absolute",
        bottom: 5,
        right: 110,
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 20,
    },

    form: {
        gap: 14,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.secondary,
        marginBottom: 4,
    },

    input: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ececec",
        fontSize: 15,
    },

    /* DROPDOWN */
    dropdownTrigger: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 14,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ececec",
    },

    dropdownText: {
        fontSize: 15,
        color: Colors.secondary,
    },

    dropdownList: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ececec",
        borderRadius: 10,
        marginTop: -5,
    },

    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    dropdownItemText: {
        fontSize: 15,
        color: Colors.secondary,
    },

    saveButton: {
        marginTop: 30,
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
