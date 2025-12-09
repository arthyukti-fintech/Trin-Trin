import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "../theme";
const foodImage = require("../../assets/images/logo (1).png");
import Svg, { Path } from "react-native-svg";
const TrinTrin = require('../../assets/videos/TrinTrin.mp4')
import { Video,ResizeMode  } from "expo-av";
export default function LoginsignupScreen() {
    const videoRef = useRef(null);
    return (
        <View style={styles.container}>

            {/* Top Title */}
            {/* <Text style={styles.title}>Trin-Trin</Text> */}

            {/* Center Image */}
            {/* <Image source={foodImage} style={styles.foodImage} resizeMode="contain" /> */}
            <Video
                ref={videoRef}
                source={TrinTrin}
                style={styles.foodVideo}
                resizeMode={ResizeMode.CONTAIN}

                shouldPlay
                isLooping
                isMuted
            />

            {/* Bottom Black Section */}

            <View style={styles.waveWrapper}>
                <Svg
                    height="90"
                    width="100%"
                    viewBox="0 0 1440 320"
                    style={styles.wave}
                >
                    <Path
                        fill="#C22B26"
                        d="M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,144C672,149,768,171,864,181.3C960,192,1056,192,1152,186.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </Svg>
            </View>

            <View style={styles.bottomContainer}>


                {/* LOGIN BUTTON */}
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                {/* SIGNUP BUTTON */}
                <TouchableOpacity style={styles.signupBtn}>
                    <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF5E3',
        alignItems: "center",
    },

    title: {
        marginTop: 60,
        fontSize: 36,
        fontWeight: "700",
        color: "black",
        letterSpacing: 2,
    },

    foodImage: {
        width: "100%",
        height: 360,
        marginTop: 60,
    },

    bottomContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#C22B26",
        paddingVertical: 40,
        // borderTopLeftRadius: 40,
        // borderTopRightRadius: 40,
        alignItems: "center",
        paddingTop: 120,
    },

    subtitle: {
        color: "black",
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 25,
    },

    loginBtn: {
        backgroundColor: Colors.primarySoft,
        paddingVertical: 15,
        width: "85%",
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 25,
    },

    loginText: {
        color: "black",
        fontSize: 18,
        fontWeight: "600",
    },

    signupBtn: {
        width: "85%",
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ffffff",
        alignItems: "center",
        marginBottom: 55
    },

    signupText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "600",
    },
    waveWrapper: {
        position: "absolute",
        bottom: 340, // adjust if needed
        width: "100%",
        zIndex: 10,

    },
    wave: {
        width: "100%",
        height: 120,

    },
    foodVideo: {
        width: 650,
        height: 360,
        marginTop: 60,
    },


});
