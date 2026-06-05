import { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { cn } from "../../lib/utils";

export type ProgressVariant = "primary" | "success" | "error" | "warning" | "info" | "neutral";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressBarProps {
  value?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: string;
  showValue?: boolean;
  indeterminate?: boolean;
}

const fillColors: Record<ProgressVariant, string> = {
  primary: colorTokens["primary-high"],
  success: colorTokens["success"],
  error:   colorTokens["error"],
  warning: colorTokens["warning"],
  info:    colorTokens["info"],
  neutral: colorTokens["neutral-subtle"],
};

const trackHeights: Record<ProgressSize, string> = {
  sm: "h-4",
  md: "h-8",
  lg: "h-12",
};

export function ProgressBar({
  value = 0,
  variant = "primary",
  size = "md",
  label,
  showValue = false,
  indeterminate = false,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const widthAnim = useRef(new Animated.Value(indeterminate ? 0 : clamped)).current;

  useEffect(() => {
    if (indeterminate) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(widthAnim, {
            toValue: 100,
            duration: 1200,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(widthAnim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    } else {
      Animated.timing(widthAnim, {
        toValue: clamped,
        duration: 400,
        useNativeDriver: false,
        easing: Easing.out(Easing.cubic),
      }).start();
    }
  }, [clamped, indeterminate]);

  const animatedWidth = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View className="gap-6">
      {(label || showValue) && (
        <View className="flex-row items-center justify-between">
          {label && (
            <Text className="font-base-medium text-label text-neutral-subtle">
              {label}
            </Text>
          )}
          {showValue && !indeterminate && (
            <Text className="font-base-semibold text-label text-neutral-high">
              {clamped}%
            </Text>
          )}
        </View>
      )}
      <View
        className={cn(
          "w-full bg-neutral-faint rounded-1000 overflow-hidden",
          trackHeights[size]
        )}
      >
        <Animated.View
          style={{
            height: "100%",
            borderRadius: 1000,
            backgroundColor: fillColors[variant],
            width: animatedWidth,
          }}
        />
      </View>
    </View>
  );
}
