import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GoBackArrowProps {
  label?: React.ReactNode;
  backTo?: Href; 
  onPress?: () => boolean | void;
  labelStyle?: any;
  wrapperStyle?: any;
  containerStyle?: any;
  iconColor?: string;
  iconSize?: number;
}

const GoBackArrow: React.FC<GoBackArrowProps> = ({
  label,
  backTo,
  onPress,
  labelStyle,
  wrapperStyle,
  containerStyle,
  iconColor = 'black',
  iconSize = 26
}) => {
  const router = useRouter();

  const handlePress = () => {
    let handled = false;

    if (onPress) {
      const result = onPress();
      handled = result === true;
    }
    if (handled) return;

    if (backTo) {
      router.push(backTo);
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/RestaurantDashboard');
  };

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <TouchableOpacity onPress={handlePress} style={[styles.container, containerStyle]}>
        <Ionicons name="arrow-back" size={iconSize} color={iconColor} />
      </TouchableOpacity>

      <View style={styles.centerContainer}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      </View>
    </View>
  );
};

export default GoBackArrow;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 30,
    position: "relative",
  },
  container: {
    padding: 8,
    borderRadius: 999,
  },
  centerContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  }
});
