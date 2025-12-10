import { Colors, Spacing } from "@/app/theme";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
type FoodHeadingProps = {
    title: string;
    subtitle?: string;
    highlightWord?: string; // optional word to color (e.g. "craving")
    emoji?: string;
};

export default function FoodHeading({
    title,
    subtitle,
    highlightWord,
    emoji,
}: FoodHeadingProps) {
    const renderTitle = () => {
        if (!highlightWord) {
            return (
                <Text style={styles.title}>
                    {title} {emoji}
                </Text>
            );
        }

        const parts = title.split(highlightWord);

        return (
            <Text style={styles.title}>
                {parts[0]}
                <Text style={styles.highlight}>{highlightWord}</Text>
                {parts[1]} {emoji}
            </Text>
        );
    };

    return (
        <View style={styles.container}>
            {renderTitle()}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.lg,
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
        color: Colors.secondary,
        // lineHeight: 34,
        // letterSpacing: 0.2,
    },

    highlight: {
        color: Colors.primary,
    },

    subtitle: {
        marginTop: Spacing.sm,
        fontSize: 14,
        color: Colors.muted,
        lineHeight: 20,
    },
});
