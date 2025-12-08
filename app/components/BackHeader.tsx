import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Typography } from "../theme";

type BackHeaderProps = {
  title?: string;
  backTo?: Href;
  replace?: boolean;

  /** ✅ Layout control */
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginBottom?: number;

  /** ✅ Style overrides */
  safeAreaStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  iconStyle?: ViewStyle;
  titleStyle?: TextStyle;
};

export default function BackHeader({
  title,
  backTo,
  replace = false,

  /** Defaults kick in only if props are undefined */
  paddingHorizontal = Spacing.md,
  paddingVertical = Spacing.sm,
  marginBottom = 0,

  safeAreaStyle,
  containerStyle,
  iconStyle,
  titleStyle,
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
    <SafeAreaView style={[styles.safe, safeAreaStyle]} edges={["top"]}>
      <View
        style={[
          styles.container,
          {
            paddingHorizontal,
            paddingVertical,
            marginBottom,
          },
          containerStyle,
        ]}
      >
        <Pressable
          onPress={handleBack}
          style={[styles.iconWrap, iconStyle]}
          hitSlop={8}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </Pressable>

        {title && (
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    // backgroundColor: Colors.background,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    padding: 6,
    borderRadius: 999,
  },
  title: {
    marginLeft: Spacing.sm,
    ...Typography.subheading,
    color: Colors.secondary,
  },
});
