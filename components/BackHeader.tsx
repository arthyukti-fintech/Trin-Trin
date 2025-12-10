import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Typography } from "@/app/theme";

type BackHeaderProps = {
    title?: string;
    backTo?: Href;
    replace?: boolean;

    /** NEW: Custom styling overrides */
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    iconStyle?: ViewStyle;
};

export default function BackHeader({
    title,
    backTo,
    replace = false,
    containerStyle,
    titleStyle,
    iconStyle,
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
            <View style={[styles.container, containerStyle]}>
                <Pressable onPress={handleBack} style={[styles.iconWrap, iconStyle]}>
                    <Ionicons name="arrow-back" size={24} color={Colors.secondary} />
                </Pressable>

                {title && (
                    <Text style={[styles.title, titleStyle]}>
                        {title}
                    </Text>
                )}
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
