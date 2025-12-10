import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Typography } from "@/app/theme";

type BackHeaderProps = {
    title?: string;
    /** Explicit navigation target (optional) */
    backTo?: Href;
    /** Replace instead of push (OTP, payment success, etc.) */
    replace?: boolean;
};

export default function BackHeader({
    title,
    backTo,
    replace = false,
}: BackHeaderProps) {
    const router = useRouter();

    const handleBack = () => {
        if (backTo) {
            replace ? router.replace(backTo) : router.push(backTo);
        } else {
            router.back();
        }
    };

    return (
        <SafeAreaView edges={["top"]} style={styles.safe}>
            <View style={styles.container}>
                <Pressable onPress={handleBack} style={styles.iconWrap}>
                    <Ionicons name="arrow-back" size={24} color={Colors.secondary} />
                </Pressable>

                {title && <Text style={styles.title}>{title}</Text>}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        backgroundColor: Colors.background,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
    },
    iconWrap: {
        padding: 6,
        borderRadius: 999,
    },
    title: {
        marginLeft: Spacing.sm,
        ...Typography.subheading,
    },
});
