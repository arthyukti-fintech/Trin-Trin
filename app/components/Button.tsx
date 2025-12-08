import { Pressable, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../theme";

type Props = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "outline";
};

export default function Button({ title, onPress, variant = "primary" }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.button,
                variant === "outline" && styles.outline,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    variant === "outline" && { color: Colors.primary },
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: 12,
        alignItems: "center",
    },
    outline: {
        backgroundColor: "transparent",
        borderWidth: 1.5,
        borderColor: Colors.primary,
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
