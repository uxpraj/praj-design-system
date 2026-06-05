import { Check, Minus } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { cn } from "../../lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
}: CheckboxProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const isFilled = checked || indeterminate;

  const handlePress = () => {
    if (disabled) return;
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.85, useNativeDriver: true, bounciness: 0 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, bounciness: 6 }),
    ]).start();
    onChange(!checked);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className="flex-row items-center gap-12"
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <View
          className={cn(
            "w-20 h-20 rounded-6 border-2 items-center justify-center",
            isFilled
              ? "bg-primary-high border-primary-high"
              : "bg-surface border-neutral-disabled",
            disabled && "opacity-40"
          )}
        >
          {indeterminate && (
            <Minus size={12} color={colorTokens["surface"]} strokeWidth={3} />
          )}
          {checked && !indeterminate && (
            <Check size={12} color={colorTokens["surface"]} strokeWidth={3} />
          )}
        </View>
      </Animated.View>
      {label && (
        <Text
          className={cn(
            "font-base text-body text-neutral-high",
            disabled && "text-neutral-muted opacity-40"
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
