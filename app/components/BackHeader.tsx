import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Typography } from "../theme";

type Props = {
    title?: string;
};

export default function BackHeader({ title }: Props) {
    const router = useRouter();

    return (
        <SafeAreaView edges={["top"]} style={styles.safe}>
            <View style={styles.container}>
                <Pressable onPress={() => router.back()} style={styles.iconWrap}>
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={Colors.secondary}
                    />
                </Pressable>

                {title ? <Text style={styles.title}>{title}</Text> : null}
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
