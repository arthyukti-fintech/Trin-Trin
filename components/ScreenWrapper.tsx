import { Colors } from "@/app/theme";
import React from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    ViewStyle,
    StyleProp,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenWrapperProps = {
    children: React.ReactNode;

    /** Layout */
    scrollable?: boolean;
    center?: boolean;

    /** Spacing */
    padding?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
    margin?: number;

    /** Colors */
    backgroundColor?: string;

    /** Safe area edges */
    safeEdges?: ("top" | "bottom" | "left" | "right")[];

    /** Style overrides */
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
};

export default function ScreenWrapper({
    children,
    scrollable = false,
    center = false,

    padding,
    paddingHorizontal,
    paddingVertical,
    margin,

    backgroundColor = Colors.background,
    safeEdges = ["top"],

    style,
    contentStyle,
}: ScreenWrapperProps) {
    const containerStyle: ViewStyle = {
        backgroundColor,
        flex: 1,
        margin,
        padding,
        paddingHorizontal,
        paddingVertical,
        justifyContent: center ? "center" : undefined,
        alignItems: center ? "center" : undefined,
    };

    if (scrollable) {
        return (
            <SafeAreaView edges={safeEdges} style={{ flex: 1, backgroundColor }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.scrollContent,
                        containerStyle,
                        contentStyle,
                    ]}
                >
                    {children}
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView edges={safeEdges} style={{ flex: 1, backgroundColor }}>
            <View style={[containerStyle, style]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
});
